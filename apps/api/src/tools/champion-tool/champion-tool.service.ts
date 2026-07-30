import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { ChampionService } from 'src/champion/champion.service';
import { Tool } from '../interfaces/tool.interface';

@Injectable()
export class ChampionToolService implements Tool {
  constructor(private readonly championService: ChampionService) {}

  searchByCost(cost: number) {
    return this.championService.findAllByCost(cost);
  }

  searchByName(name: string) {
    return this.championService.findByName(name);
  }

  searchByTrait(trait: Trait) {
    return this.championService.findByTrait(trait);
  }
}
