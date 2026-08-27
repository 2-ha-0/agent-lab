import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TraitService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.traitInfo.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findByName(name: Trait) {
    return this.prisma.traitInfo.findFirst({ where: { name } });
  }
}
