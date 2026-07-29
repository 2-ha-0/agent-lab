import { Injectable } from '@nestjs/common';
import { Item, ItemType } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany({
      orderBy: [{ name: 'asc' }],
    });
  }

  async findByName(name: string): Promise<Item | null> {
    return this.prisma.item.findFirst({
      where: { name },
    });
  }

  async findByType(type: ItemType): Promise<Item[]> {
    return this.prisma.item.findMany({
      where: { type },
    });
  }

  async findByAD(): Promise<Item[]> {
    return this.prisma.$queryRaw<Item[]>`
      SELECT *
      FROM "Item"
      WHERE effects::text LIKE ${'%AD%'}
    `;
  }

  async findByAP(): Promise<Item[]> {
    return this.prisma.$queryRaw<Item[]>`
      SELECT *
      FROM "Item"
      WHERE effects::text LIKE ${'%AP%'}
    `;
  }
}
