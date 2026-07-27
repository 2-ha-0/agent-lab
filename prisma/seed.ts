import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient, Role, Trait } from '../generated/prisma/client';

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

function toInputJsonValue(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

function mapRole(role: string | null): Role {
  if (role === null) {
    return Role.null;
  }

  if (!(role in Role)) {
    throw new Error(`Unknown role: ${role}`);
  }

  return Role[role as keyof typeof Role];
}

function mapTrait(trait: string): Trait {
  const key = trait.replace(/[\s.]/g, '');

  if (!(key in Trait)) {
    throw new Error(`Unknown trait: ${trait}`);
  }

  return Trait[key as keyof typeof Trait];
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  // PrismaPg ignores ?schema= in the URL unless schema is passed explicitly
  const schema =
    new URL(connectionString).searchParams.get('schema') ?? undefined;

  const adapter = new PrismaPg(
    {
      connectionString,
      ...(schema ? { options: `-c search_path="${schema}",public` } : {}),
    },
    { schema },
  );
  const prisma = new PrismaClient({ adapter });

  try {
    const VERSION = '17.7';
    const filePath = join(
      process.cwd(),
      'data',
      `tft_set${VERSION}_champion.json`,
    );
    const raw = readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw) as ChampionDataFile;
    const version = data.meta.mutator ?? `TFTSet${data.meta.set}`;

    const champions = data.champions.list.map((champion) => ({
      cost: champion.cost,
      name: champion.name,
      role: mapRole(champion.role),
      traits: champion.traits.map(mapTrait),
      stat_1star: toInputJsonValue(champion.statsByStar['1성']),
      stat_2star: toInputJsonValue(champion.statsByStar['2성']),
      stat_3star: toInputJsonValue(champion.statsByStar['3성']),
      ability: toInputJsonValue(champion.ability),
      version: VERSION,
      description: '',
    }));

    await prisma.$transaction(async (tx) => {
      await tx.champion.deleteMany();
      await tx.champion.createMany({ data: champions });
    });

    console.log(`Seeded ${champions.length} champions (${version})`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
