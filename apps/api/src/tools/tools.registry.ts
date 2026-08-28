import { Injectable } from '@nestjs/common';
import { ChampionToolService } from './champion-tool/champion-tool.service';
import { ItemToolService } from './item-tool/item-tool.service';
import { TraitToolService } from './trait-tool/trait-tool.service';
import { DynamicStructuredTool } from '@langchain/core/tools';

@Injectable()
export class ToolRegistry {
  private readonly tools = new Map<string, DynamicStructuredTool>();

  constructor(
    private readonly championTool: ChampionToolService,
    private readonly itemTool: ItemToolService,
    private readonly traitTool: TraitToolService,
  ) {}

  onModuleInit() {
    this.register(this.championTool.getTools());
    this.register(this.itemTool.getTools());
    this.register(this.traitTool.getTools());
  }

  private register(tools: DynamicStructuredTool[]) {
    for (const tool of tools) {
      this.tools.set(tool.name, tool);
    }
  }

  getAll() {
    return Array.from(this.tools.values());
  }
}
