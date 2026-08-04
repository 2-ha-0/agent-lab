import { Injectable } from '@nestjs/common';
import { ChampionToolService } from './champion-tool/champion-tool.service';
import { ItemToolService } from './item-tool/item-tool.service';
import { Tool } from './interfaces/tool.interface';
import { TraitToolService } from './trait-tool/trait-tool.service';

@Injectable()
export class ToolRegistry {
  private readonly tools = new Map<string, Tool>();

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

  register(tools: Tool[]) {
    for (const tool of tools) {
      this.tools.set(tool.name, tool);
    }
  }

  getAll(): Tool[] {
    return [...this.tools.values()];
  }

  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }
}
