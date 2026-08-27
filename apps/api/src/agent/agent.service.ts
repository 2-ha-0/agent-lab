import { Injectable } from '@nestjs/common';
import { BaseMessage, ToolMessage } from '@langchain/core/messages';
import { LlmService } from 'src/llm/llm.service';
import { PromptService } from 'src/prompt/prompt.service';
import { RetrievalService } from 'src/retrieval/retrieval.service';
import { ToolRegistry } from 'src/tools/tools.registry';

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly promptService: PromptService,
    private readonly toolRegistry: ToolRegistry,
    private readonly retrievalService: RetrievalService,
  ) {}

  // async selectTool(toolName: string, parameters: Record<string, any>) {
  //   const tool = this.toolRegistry.get(toolName);

  //   if (!tool) {
  //     return 'Tool을 선택할 수 없습니다.';
  //   }

  //   return tool.execute(parameters);
  // }

  async run(question: string) {
    const context = await this.retrievalService.retrieve(question);
    const contextText = context.map((item) => item.payload?.text).join('\n');
    const tools = this.toolRegistry.getAll();
    const histories: {
      toolName: string;
      result: unknown;
    }[] = [];

    const messages: BaseMessage[] = await this.promptService.buildAgentPrompt(
      question,
      histories,
      tools,
      contextText,
    );

    const maxIterations = 10;
    let iterations = 0;

    while (iterations < maxIterations) {
      iterations += 1;

      const response = await this.llmService.invoke(messages, tools);

      if (!response.tool_calls?.length) {
        return response.content;
      }

      messages.push(response);

      for (const toolCall of response.tool_calls) {
        const tool = this.toolRegistry.get(toolCall.name);

        if (!tool) {
          throw new Error(`Tool not found: ${toolCall.name}`);
        }

        const result = await tool.invoke(toolCall.args);

        console.log(`Tool [${toolCall.name}] result:`, result);

        histories.push({
          toolName: toolCall.name,
          result,
        });

        messages.push(
          new ToolMessage({
            content: JSON.stringify(result),
            tool_call_id: toolCall.id!,
          }),
        );
      }
    }

    return '최대 도구 호출 횟수에 도달했습니다.';
  }
}
