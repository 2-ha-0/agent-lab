import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { ChampionToolService } from 'src/tools/champion-tool/champion-tool.service';

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly championToolService: ChampionToolService,
  ) {}

  async selectTool(question: string) {
    const tool = await this.llmService.selectTool(question);
    console.log('tool', tool);

    let toolResult: any;

    switch (tool.tool) {
      case 'searchChampionByCost':
        toolResult = await this.championToolService.searchByCost(
          tool.parameters.cost,
        );
        break;

      case 'searchChampionByName':
        toolResult = await this.championToolService.searchByName(
          tool.parameters.name,
        );
        break;
    }

    if (toolResult) {
      return this.llmService.answer(question, toolResult);
    }

    return 'Tool을 선택할 수 없습니다.';
  }
}
