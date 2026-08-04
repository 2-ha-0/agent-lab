import { Module } from '@nestjs/common';
import { ChampionToolService } from './champion-tool/champion-tool.service';
import { ChampionModule } from 'src/champion/champion.module';
import { ItemToolService } from './item-tool/item-tool.service';
import { ItemModule } from 'src/item/item.module';
import { TraitToolService } from './trait-tool/trait-tool.service';
import { TraitModule } from 'src/trait/trait.module';
import { ToolRegistry } from './tools.registry';

@Module({
  providers: [
    ChampionToolService,
    ItemToolService,
    TraitToolService,
    ToolRegistry,
  ],
  exports: [ToolRegistry],
  imports: [ChampionModule, ItemModule, TraitModule],
})
export class ToolsModule {}
