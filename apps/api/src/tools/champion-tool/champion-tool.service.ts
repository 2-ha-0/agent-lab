import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { ChampionService } from 'src/champion/champion.service';
import { Tool } from '../interfaces/tool.interface';

@Injectable()
export class ChampionToolService {
  constructor(private readonly championService: ChampionService) {}

  getTools(): Tool[] {
    return [
      {
        name: 'searchByCost',
        description: 'Search champions by cost',
        parameters: {
          cost: 'number',
        },
        execute: ({ cost }: { cost: number }) =>
          this.championService.findAllByCost(cost),
      },
      {
        name: 'searchByName',
        description: 'Search champions by name',
        parameters: {
          name: 'string',
        },
        execute: ({ name }: { name: string }) =>
          this.championService.findByName(name),
      },
      {
        name: 'searchByTrait',
        description: 'Search champions by trait',
        parameters: {
          trait: 'string',
        },
        execute: ({ trait }: { trait: Trait }) =>
          this.championService.findByTrait(trait),
      },
    ];
  }
}
