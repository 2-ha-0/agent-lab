import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '../../generated/prisma/client';
import { mapRole, mapTrait, toInputJsonValue } from './shared';

type ChampionJson = {
  name: string;
  cost: number;
  role: string | null;
  traits: string[];
  statsByStar: {
    '1성': Record<string, unknown>;
    '2성': Record<string, unknown>;
    '3성': Record<string, unknown>;
  };
  ability: Record<string, unknown>;
};

type ChampionDataFile = {
  meta: {
    set: number;
    mutator: string;
  };
  champions: {
    list: ChampionJson[];
  };
};

export async function seedChampions(prisma: PrismaClient) {
  const version = '17.7';
  const filePath = join(process.cwd(), 'data', `tft_set${version}_champion.json`);
  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw) as ChampionDataFile;
  const label = data.meta.mutator ?? `TFTSet${data.meta.set}`;

  const champions = data.champions.list.map((champion) => ({
    cost: champion.cost,
    name: champion.name,
    role: mapRole(champion.role),
    traits: champion.traits.map(mapTrait),
    stat_1star: toInputJsonValue(champion.statsByStar['1성']),
    stat_2star: toInputJsonValue(champion.statsByStar['2성']),
    stat_3star: toInputJsonValue(champion.statsByStar['3성']),
    ability: toInputJsonValue(champion.ability),
    version,
    description: '',
  }));

  await prisma.$transaction(async (tx) => {
    await tx.champion.deleteMany();
    await tx.champion.createMany({ data: champions });
  });

  console.log(`Seeded ${champions.length} champions (${label})`);
}
