import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChampionService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.championInfo.findMany({
      orderBy: [{ cost: 'asc' }, { name: 'asc' }],
    });
  }

  findAllByCost(cost: number) {
    return this.prisma.championInfo.findMany({
      where: { cost },
      orderBy: { cost: 'asc' },
    });
  }

  findByName(name: string) {
    return this.prisma.championInfo.findFirst({
      where: { name },
    });
  }

  findByTrait(trait: Trait) {
    return this.prisma.championInfo.findMany({
      where: { traits: { has: trait } },
      orderBy: { cost: 'asc' },
    });
  }
}
