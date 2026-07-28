import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { ChampionToolService } from 'src/tools/champion-tool/champion-tool.service';

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly championToolService: ChampionToolService,
  ) {}

  async selectTool(tool: { tool: string; parameters: Record<string, any> }) {
    // const tools = await this.llmService.selectTools(question);
    // console.log('tools', tools);

    // let toolResults: any;

    switch (tool.tool) {
      case 'searchChampionByCost':
        return await this.championToolService.searchByCost(
          tool.parameters.cost,
        );

      case 'searchChampionByName':
        return await this.championToolService.searchByName(
          tool.parameters.name,
        );
      // case 'searchItemByChampion':
      //   toolResults.push(
      //     await this.itemTool.searchByChampion(tool.parameters.champion),
      //   );
      //   break;
    }

    return 'Tool을 선택할 수 없습니다.';
  }

  async test(question: string) {
    const histories: {
      tool: string;
      result: unknown;
    }[] = [];

    while (true) {
      const action = await this.llmService.decide(question, histories);
      console.log('action', action);

      if (action.type === 'answer') {
        return action.answer;
      }

      const tool = action.tool ?? '';
      const parameters = action.parameters ?? {};
      const result = await this.selectTool({
        tool,
        parameters,
      });

      histories.push({
        tool,
        result,
      });
    }
  }
}
