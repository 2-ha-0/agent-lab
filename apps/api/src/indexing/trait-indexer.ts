import type { TraitInfo } from '../../generated/prisma/client';
import type { QdrantService, UpsertPayload } from '../qdrant/qdrant.service';
import { buildTraitEmbeddingText } from './trait-document';

export type TraitIndexerDeps = {
  ensureCollection: () => Promise<void>;
  deleteByType: (type: string) => Promise<void>;
  embed: (text: string) => Promise<number[]>;
  upsert: (embedding: number[], payload: UpsertPayload) => Promise<void>;
};

export function createTraitIndexerDeps(
  qdrantService: QdrantService,
  embed: (text: string) => Promise<number[]>,
): TraitIndexerDeps {
  return {
    ensureCollection: () => qdrantService.ensureCollection(),
    deleteByType: (type) => qdrantService.deleteByType(type),
    embed,
    upsert: (embedding, payload) => qdrantService.upsert(embedding, payload),
  };
}

export async function indexTraitRecords(
  traits: TraitInfo[],
  deps: TraitIndexerDeps,
) {
  await deps.ensureCollection();
  await deps.deleteByType('trait');

  for (const trait of traits) {
    const text = buildTraitEmbeddingText(trait);
    const embedding = await deps.embed(text);

    await deps.upsert(embedding, {
      name: trait.name,
      text,
      type: 'trait',
      version: trait.version,
      traitId: trait.id,
      pointKey: `trait:${trait.version}:${trait.apiName}`,
    });
  }

  return { indexed: traits.length };
}
