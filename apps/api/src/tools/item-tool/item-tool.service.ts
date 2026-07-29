import { Injectable } from '@nestjs/common';
import { Item, ItemType } from 'generated/prisma/client';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class ItemToolService {
  constructor(private readonly itemService: ItemService) {}

  async searchByName(name: string): Promise<Item | null> {
    return this.itemService.findByName(name);
  }

  async searchByType(type: ItemType): Promise<Item[]> {
    return this.itemService.findByType(type);
  }

  async searchByAD(): Promise<Item[]> {
    return this.itemService.findByAD();
  }

  async searchByAP(): Promise<Item[]> {
    return this.itemService.findByAP();
  }
}
