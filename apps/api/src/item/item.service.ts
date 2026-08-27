import { Injectable } from '@nestjs/common';
import type { ItemType } from '../../generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.itemInfo.findMany({
      orderBy: [{ name: 'asc' }],
    });
  }

  findByName(name: string) {
    return this.prisma.itemInfo.findFirst({
      where: { name },
    });
  }

  findByType(type: ItemType) {
    return this.prisma.itemInfo.findMany({
      where: { type },
    });
  }

  findByAD() {
    return this.prisma.$queryRaw`
      SELECT *
      FROM "ItemInfo"
      WHERE effects::text LIKE ${'%AD%'}
    `;
  }

  findByAP() {
    return this.prisma.$queryRaw`
      SELECT *
      FROM "ItemInfo"
      WHERE effects::text LIKE ${'%AP%'}
    `;
  }
}
