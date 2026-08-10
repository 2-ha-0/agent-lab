import { ChatOpenAI } from '@langchain/openai';
import { BaseMessage, ToolMessage } from '@langchain/core/messages';
import { Injectable } from '@nestjs/common';
import { LlmClientService } from 'src/llm-client/llm-client.service';
import { PromptService } from 'src/prompt/prompt.service';
import { ToolRegistry } from 'src/tools/tools.registry';

@Injectable()
export class LlmService {
  private readonly model = new ChatOpenAI({
    model: 'Qwen/Qwen3.5-35B-A3B-FP8',
    apiKey: process.env.LLM_API_KEY ?? 'not-needed',
    configuration: {
      baseURL: process.env.LLM_BASE_URL ?? 'http://192.168.14.248:12001/v1',
    },
  });

  constructor(
    private readonly llmClientService: LlmClientService,
    private readonly promptService: PromptService,
    private readonly toolRegistry: ToolRegistry,
  ) {}

  async generate(prompt: string) {
    const response = await this.llmClientService.chat(
      'Qwen/Qwen3.5-35B-A3B-FP8',
      [
        {
          role: 'user',
          content: prompt,
        },
      ],
    );

    return response;
  }

  async selectTools(
    question: string,
  ): Promise<{ tool: string; parameters: Record<string, any> }[]> {
    const prompt = this.promptService.buildSelectToolsPrompt(question);
    const response = await this.generate(prompt);

    console.log('response', response);

    return this.parseJsonResponse(response) as {
      tool: string;
      parameters: Record<string, any>;
    }[];
  }

  async answer(question: string, toolResults: any) {
    const prompt = this.promptService.buildAnswerPrompt(question, toolResults);
    const response = await this.generate(prompt);

    return response;
  }

  async decide(
    question: string,

    // tools: Tool[],
    context: string,
  ) {
    const tools = this.toolRegistry.getAll();
    const modelWithTools = this.model.bindTools(tools);
    const histories: {
      toolName: string;
      result: unknown;
    }[] = [];

    const messages: BaseMessage[] = await this.promptService.buildDecidePrompt(
      question,
      histories,
      tools,
      context,
    );

    const maxIterations = 10;
    let iterations = 0;

    while (iterations < maxIterations) {
      iterations += 1;

      const response = await modelWithTools.invoke(messages);

      // Tool 호출이 없다면 최종 답변
      if (!response.tool_calls?.length) {
        return response.content;
      }

      for (const toolCall of response.tool_calls) {
        const tool = tools.find((tool) => tool.name === toolCall.name);

        if (!tool) {
          throw new Error(`Tool not found: ${toolCall.name}`);
        }

        const result = await tool.invoke(toolCall.args);

        console.log(`Tool [${toolCall.name}] result:`, result);

        // History 저장
        histories.push({
          toolName: toolCall.name,
          result,
        });

        // Tool 결과를 LLM에게 전달
        messages.push(
          new ToolMessage({
            content: JSON.stringify(result),
            tool_call_id: toolCall.id!,
          }),
        );
      }
    }

    return messages;
  }

  /** LLM이 마크다운 코드펜스나 부가 텍스트를 붙여도 JSON만 추출해 파싱한다. */
  private parseJsonResponse(raw: string): unknown {
    const trimmed = raw.trim();
    const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    const candidate = (fenced?.[1] ?? trimmed).trim();

    try {
      return JSON.parse(candidate);
    } catch {
      const objectMatch = candidate.match(/\{[\s\S]*\}/);
      const arrayMatch = candidate.match(/\[[\s\S]*\]/);
      const embedded = objectMatch?.[0] ?? arrayMatch?.[0];
      if (!embedded) {
        throw new Error(`LLM 응답을 JSON으로 파싱할 수 없습니다: ${raw}`);
      }
      return JSON.parse(embedded);
    }
  }

  async invoke(messages: BaseMessage[]) {
    return this.model.invoke(messages);
  }
}
