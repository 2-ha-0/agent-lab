import type { ChampionInfo } from '../../generated/prisma/client';
import type { QdrantService, UpsertPayload } from '../qdrant/qdrant.service';
import { buildChampionEmbeddingText } from './champion-document';

export type ChampionIndexerDeps = {
  ensureCollection: () => Promise<void>;
  deleteByType: (type: string) => Promise<void>;
  embed: (text: string) => Promise<number[]>;
  upsert: (embedding: number[], payload: UpsertPayload) => Promise<void>;
};

export function createChampionIndexerDeps(
  qdrantService: QdrantService,
  embed: (text: string) => Promise<number[]>,
): ChampionIndexerDeps {
  return {
    ensureCollection: () => qdrantService.ensureCollection(),
    deleteByType: (type) => qdrantService.deleteByType(type),
    embed,
    upsert: (embedding, payload) => qdrantService.upsert(embedding, payload),
  };
}

export async function indexChampionRecords(
  champions: ChampionInfo[],
  deps: ChampionIndexerDeps,
) {
  await deps.ensureCollection();
  await deps.deleteByType('champion');

  for (const champion of champions) {
    const text = buildChampionEmbeddingText(champion);
    const embedding = await deps.embed(text);

    await deps.upsert(embedding, {
      name: champion.name,
      text,
      type: 'champion',
      version: champion.version,
      championId: champion.id,
      pointKey: `champion:${champion.version}:${champion.name}`,
    });
  }

  return { indexed: champions.length };
}
