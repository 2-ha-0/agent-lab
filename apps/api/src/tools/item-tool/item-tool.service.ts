import { Injectable } from '@nestjs/common';
import type { ItemType } from '../../../generated/prisma/enums';
import { ItemService } from 'src/item/item.service';
import { Tool } from '../interfaces/tool.interface';

@Injectable()
export class ItemToolService {
  constructor(private readonly itemService: ItemService) {}

  getTools(): Tool[] {
    return [
      {
        name: 'searchByName',
        description: 'Search items by name',
        parameters: {
          name: 'string',
        },
        execute: ({ name }: { name: string }) =>
          this.itemService.findByName(name),
      },
      {
        name: 'searchByType',
        description: 'Search items by type',
        parameters: {
          type: 'string',
        },
        execute: ({ type }: { type: ItemType }) =>
          this.itemService.findByType(type),
      },
      {
        name: 'searchByAD',
        description: 'Search items by AD',
        parameters: {},
        execute: () => this.itemService.findByAD(),
      },
      {
        name: 'searchByAP',
        description: 'Search items by AP',
        parameters: {},
        execute: () => this.itemService.findByAP(),
      },
      {
        name: 'searchAll',
        description: 'Search all items',
        parameters: {},
        execute: () => this.itemService.findAll(),
      },
    ];
  }
}
