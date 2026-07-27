import { Module } from '@nestjs/common';
import { ChampionToolService } from './champion-tool/champion-tool.service';

@Module({
  providers: [ChampionToolService],
  exports: [ChampionToolService],
})
export class ToolsModule {}
