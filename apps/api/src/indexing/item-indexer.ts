import type { ItemInfo } from '../../generated/prisma/client';
import type { QdrantService, UpsertPayload } from '../qdrant/qdrant.service';
import { buildItemEmbeddingText } from './item-document';

export type ItemIndexerDeps = {
  ensureCollection: () => Promise<void>;
  deleteByType: (type: string) => Promise<void>;
  embed: (text: string) => Promise<number[]>;
  upsert: (embedding: number[], payload: UpsertPayload) => Promise<void>;
};

export function createItemIndexerDeps(
  qdrantService: QdrantService,
  embed: (text: string) => Promise<number[]>,
): ItemIndexerDeps {
  return {
    ensureCollection: () => qdrantService.ensureCollection(),
    deleteByType: (type) => qdrantService.deleteByType(type),
    embed,
    upsert: (embedding, payload) => qdrantService.upsert(embedding, payload),
  };
}

export async function indexItemRecords(
  items: ItemInfo[],
  deps: ItemIndexerDeps,
) {
  await deps.ensureCollection();
  await deps.deleteByType('item');

  for (const item of items) {
    const text = buildItemEmbeddingText(item);
    const embedding = await deps.embed(text);

    await deps.upsert(embedding, {
      name: item.name,
      text,
      type: 'item',
      version: item.version,
      itemId: item.id,
      pointKey: `item:${item.version}:${item.type}:${item.name}`,
    });
  }

  return { indexed: items.length };
}
