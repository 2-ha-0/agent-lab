import { Module } from '@nestjs/common';
import { ChampionToolService } from './champion-tool/champion-tool.service';
import { ChampionModule } from 'src/champion/champion.module';
import { ItemToolService } from './item-tool/item-tool.service';
import { ItemModule } from 'src/item/item.module';

@Module({
  providers: [ChampionToolService, ItemToolService],
  exports: [ChampionToolService, ItemToolService],
  imports: [ChampionModule, ItemModule],
})
export class ToolsModule {}
