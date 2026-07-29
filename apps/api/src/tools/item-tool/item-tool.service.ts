import { Injectable } from '@nestjs/common';
import type { ItemType } from '../../../generated/prisma/enums';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class ItemToolService {
  constructor(private readonly itemService: ItemService) {}

  searchByName(name: string) {
    return this.itemService.findByName(name);
  }

  searchByType(type: ItemType) {
    return this.itemService.findByType(type);
  }

  searchByAD() {
    return this.itemService.findByAD();
  }

  searchByAP() {
    return this.itemService.findByAP();
  }

  searchAll() {
    return this.itemService.findAll();
  }
}
