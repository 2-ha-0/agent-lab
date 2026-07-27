import { Injectable } from '@nestjs/common';
import { Champion } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChampionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByCost(cost: number): Promise<Champion[]> {
    const champions = await this.prisma.champion.findMany({
      where: {
        cost,
      },
      orderBy: {
        cost: 'asc',
      },
    });

    return champions;
  }

  async findByName(name: string): Promise<Champion | null> {
    const champion = await this.prisma.champion.findFirst({
      where: {
        name,
      },
    });

    return champion;
  }
}
