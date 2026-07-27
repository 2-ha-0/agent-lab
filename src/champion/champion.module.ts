import { Module } from '@nestjs/common';
import { ChampionService } from './champion.service';

@Module({
  providers: [ChampionService],
  exports: [ChampionService],
})
export class ChampionModule {}
