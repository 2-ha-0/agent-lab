import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { ChampionService } from 'src/champion/champion.service';
import { tool } from '@langchain/core/tools';
import z from 'zod/v3';

@Injectable()
export class ChampionToolService {
  constructor(private readonly championService: ChampionService) {}

  getTools() {
    return [
      tool(
        async ({ cost }) => {
          return this.championService.findAllByCost(cost);
        },
        {
          name: 'searchChampionsByCost',
          description: '코스트를 기준으로 챔피언을 검색합니다.',
          schema: z.object({
            cost: z.number(),
          }),
        },
      ),
      tool(
        async ({ name }) => {
          return this.championService.findByName(name);
        },
        {
          name: 'searchChampionsByName',
          description: '이름을 기준으로 챔피언을 검색합니다.',
          schema: z.object({
            name: z.string(),
          }),
        },
      ),
      tool(
        async ({ trait }) => {
          return this.championService.findByTrait(trait);
        },
        {
          name: 'searchChampionsByTrait',
          description: '트레잇을 기준으로 챔피언을 검색합니다.',
          schema: z.object({
            trait: z.nativeEnum(Trait),
          }),
        },
      ),
    ];
  }
}
