import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { RetrievalService } from 'src/retrieval/retrieval.service';
import { ToolRegistry } from 'src/tools/tools.registry';

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly toolRegistry: ToolRegistry,
    private readonly retrievalService: RetrievalService,
  ) {}

  async selectTool(toolName: string, parameters: Record<string, any>) {
    const tool = this.toolRegistry.get(toolName);

    if (!tool) {
      return 'Tool을 선택할 수 없습니다.';
    }

    return tool.execute(parameters);
  }

  async test(question: string) {
    const context = await this.retrievalService.retrieval(question);

    const contextText = context.map((item) => item.payload?.text).join('\n');

    console.log('context', context);

    const histories: {
      toolName: string;
      result: unknown;
    }[] = [];

    const tools = this.toolRegistry.getAll();

    const maxIterations = 5;
    let iterations = 0;

    while (iterations < maxIterations) {
      iterations += 1;

      const action = await this.llmService.decide(
        question,
        histories,
        tools,
        contextText,
      );
      console.log('action', action);

      if (action.type === 'answer') {
        return action.answer;
      }

      const toolName = action.tool ?? '';
      const parameters = action.parameters ?? {};
      const result = await this.selectTool(toolName, parameters);

      histories.push({
        toolName,
        result,
      });
    }

    return '최대 시도 횟수를 초과했습니다.';
  }
}
