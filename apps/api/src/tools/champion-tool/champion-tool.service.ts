import { Injectable } from '@nestjs/common';
import { Champion } from 'generated/prisma/client';
import { ChampionService } from 'src/champion/champion.service';

@Injectable()
export class ChampionToolService {
  constructor(private readonly championService: ChampionService) {}

  async searchByCost(cost: number): Promise<Champion[]> {
    return this.championService.findAllByCost(cost);
  }

  async searchByName(name: string): Promise<Champion | null> {
    return this.championService.findByName(name);
  }
}
