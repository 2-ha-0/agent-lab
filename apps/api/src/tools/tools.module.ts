import { Module } from '@nestjs/common';
import { ChampionToolService } from './champion-tool/champion-tool.service';
import { ChampionModule } from 'src/champion/champion.module';

@Module({
  providers: [ChampionToolService],
  exports: [ChampionToolService],
  imports: [ChampionModule],
})
export class ToolsModule {}
