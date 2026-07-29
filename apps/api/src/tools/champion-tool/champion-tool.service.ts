import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { ChampionService } from 'src/champion/champion.service';

@Injectable()
export class ChampionToolService {
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
