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

  // async selectTool(toolName: string, parameters: Record<string, any>) {
  //   const tool = this.toolRegistry.get(toolName);

  //   if (!tool) {
  //     return 'Tool을 선택할 수 없습니다.';
  //   }

  //   return tool.execute(parameters);
  // }

  async test(question: string) {
    const context = await this.retrievalService.retrieval(question);

    const contextText = context.map((item) => item.payload?.text).join('\n');

    console.log('context', context);

    return await this.llmService.decide(question, contextText);
  }
}
