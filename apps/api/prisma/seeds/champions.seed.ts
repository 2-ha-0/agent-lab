import { config as loadEnv } from 'dotenv';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { PrismaClient } from '../../generated/prisma/client';
// import {
//   createChampionIndexerDeps,
//   indexChampionRecords,
// } from '../../src/indexing/champion-indexer';
// import { QdrantService } from '../../src/qdrant/qdrant.service';
import { mapRole, mapTrait, toInputJsonValue } from './shared';

loadEnv({ path: resolve(__dirname, '../../../.env') });

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

// type OllamaEmbedResponse = {
//   embeddings: number[][];
// };

// async function embedWithOllama(text: string): Promise<number[]> {
//   const response = await fetch('http://localhost:11434/api/embed', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ model: 'bge-m3', input: text }),
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Ollama embed failed: ${response.status} ${response.statusText}`,
//     );
//   }

//   const data = (await response.json()) as OllamaEmbedResponse;
//   return data.embeddings[0];
// }

export async function seedChampions(prisma: PrismaClient) {
  const version = '17.7';
  const filePath = join(
    process.cwd(),
    'data',
    `tft_set${version}_champion.json`,
  );
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
    await tx.championInfo.deleteMany();
    await tx.championInfo.createMany({ data: champions });
  });

  console.log(`Seeded ${champions.length} champions (${label})`);

  // vector indexing
  // const saved = await prisma.championInfo.findMany({
  //   orderBy: [{ cost: 'asc' }, { name: 'asc' }],
  // });

  // const qdrantService = new QdrantService();
  // const deps = createChampionIndexerDeps(qdrantService, embedWithOllama);
  // const result = await indexChampionRecords(saved, deps);

  // console.log(`Qdrant indexed ${result.indexed} champions`);
}
