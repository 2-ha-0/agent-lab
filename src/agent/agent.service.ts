import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { PromptService } from 'src/prompt/prompt.service';
import { ChampionToolService } from 'src/tools/champion-tool/champion-tool.service';

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly promptService: PromptService,
    private readonly championToolService: ChampionToolService,
  ) {}

  async selectTool(question: string) {
    const tool = await this.llmService.selectTool(question);

    switch (tool.name) {
      case 'searchChampionByCost':
        return this.championToolService.searchByCost(tool.parameters.cost);

      case 'searchChampionByName':
        return this.championToolService.searchByName(tool.parameters.name);
    }

    return 'Tool을 선택할 수 없습니다.';
  }
}
