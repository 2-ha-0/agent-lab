import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { ToolRegistry } from 'src/tools/tools.registry';

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly toolRegistry: ToolRegistry,
  ) {}

  async selectTool(toolName: string, parameters: Record<string, any>) {
    const tool = this.toolRegistry.get(toolName);

    if (!tool) {
      return 'Tool을 선택할 수 없습니다.';
    }

    return tool.execute(parameters);
  }

  async test(question: string) {
    const histories: {
      toolName: string;
      result: unknown;
    }[] = [];

    const tools = this.toolRegistry.getAll();

    while (true) {
      const action = await this.llmService.decide(question, histories, tools);
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
  }
}
