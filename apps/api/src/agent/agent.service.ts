import { Injectable } from '@nestjs/common';
import { AIMessage } from '@langchain/core/messages';
import { createAgent, modelCallLimitMiddleware } from 'langchain';
import { GraphRecursionError } from '@langchain/langgraph';
import { LlmService } from 'src/llm/llm.service';
import { PromptService } from 'src/prompt/prompt.service';
import { RetrievalService } from 'src/retrieval/retrieval.service';
import { ToolRegistry } from 'src/tools/tools.registry';

type TraceStep = {
  type: 'retrieve' | 'model' | 'tool' | 'end';
  name?: string;
};

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly promptService: PromptService,
    private readonly toolRegistry: ToolRegistry,
    private readonly retrievalService: RetrievalService,
  ) {}

  async getGraph() {
    const drawable = await this.createAgent().graph.getGraphAsync();

    return drawable.drawMermaid();
  }

  async run(question: string) {
    const { messages } = await this.execute(question);

    return this.getFinalContent(messages);
  }

  async trace(question: string) {
    const { messages } = await this.execute(question);
    const steps = this.buildTrace(messages);

    return {
      answer: this.getFinalContent(messages),
      steps,
      mermaid: this.drawTraceMermaid(steps),
    };
  }

  private async execute(question: string) {
    const context = await this.retrievalService.retrieve(question);
    const contextText = context.map((item) => item.payload?.text).join('\n');
    const agent = this.createAgent();

    try {
      const result = await agent.invoke(
        {
          messages: [
            {
              role: 'user',
              content: this.promptService.buildAgentUserMessage(
                question,
                contextText,
              ),
            },
          ],
        },
        { recursionLimit: 25 },
      );

      return { messages: result.messages };
    } catch (error) {
      if (error instanceof GraphRecursionError) {
        return { messages: [] };
      }

      throw error;
    }
  }

  private buildTrace(messages: unknown[]) {
    const steps: TraceStep[] = [{ type: 'retrieve' }];

    for (const message of messages) {
      if (!AIMessage.isInstance(message)) {
        continue;
      }

      steps.push({ type: 'model' });

      if (message.tool_calls?.length) {
        for (const toolCall of message.tool_calls) {
          steps.push({ type: 'tool', name: toolCall.name });
        }
      } else {
        steps.push({ type: 'end' });
      }
    }

    if (steps.at(-1)?.type !== 'end') {
      steps.push({ type: 'end' });
    }

    return steps;
  }

  private drawTraceMermaid(steps: TraceStep[]) {
    const labels: Record<string, (step: { name?: string }) => string> = {
      retrieve: () => 'retrieve',
      model: () => '모델',
      tool: (step) => step.name ?? 'tool',
      end: () => '끝',
    };
    const lines = ['flowchart TD', '  start([시작])'];
    let previous = 'start';

    steps.forEach((step, index) => {
      const id = `n${index}`;
      const label = labels[step.type](step);
      const shape =
        step.type === 'end' ? `([${label}])` : `[${JSON.stringify(label)}]`;

      lines.push(`  ${id}${shape}`);
      lines.push(`  ${previous} --> ${id}`);
      previous = id;
    });

    return lines.join('\n');
  }

  private getFinalContent(messages: unknown[]) {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const message = messages[i];
      if (AIMessage.isInstance(message) && !message.tool_calls?.length) {
        return message.content;
      }
    }

    return '최대 도구 호출 횟수에 도달했습니다.';
  }

  private createAgent() {
    return createAgent({
      model: this.llmService.getModel(),
      tools: this.toolRegistry.getAll(),
      systemPrompt: this.promptService.getAgentSystemPrompt(),
      middleware: [
        modelCallLimitMiddleware({
          runLimit: 10,
          exitBehavior: 'end',
        }),
      ],
    });
  }
}
