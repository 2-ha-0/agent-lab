import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';

const COLLECTION = 'test';
const VECTOR_SIZE = 1024;
/** Fixed namespace for deterministic point IDs */
const POINT_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

export type UpsertPayload = {
  name: string;
  text: string;
  type?: string;
  version?: string;
  championId?: string;
  pointKey?: string;
};

@Injectable()
export class QdrantService {
  private client = new QdrantClient({
    host: 'localhost',
    port: 6333,
  });

  async createCollection() {
    await this.client.createCollection(COLLECTION, {
      vectors: {
        size: VECTOR_SIZE,
        distance: 'Cosine',
      },
    });
  }

  async ensureCollection() {
    const exists = await this.client.collectionExists(COLLECTION);
    if (!exists.exists) {
      await this.createCollection();
    }
  }

  async deleteByType(type: string) {
    await this.ensureCollection();
    await this.client.delete(COLLECTION, {
      wait: true,
      filter: {
        must: [
          {
            key: 'type',
            match: { value: type },
          },
        ],
      },
    });
  }

  async upsert(embedding: number[], payload: UpsertPayload) {
    const type = payload.type ?? 'manual';
    const id = payload.pointKey
      ? uuidv5(payload.pointKey, POINT_NAMESPACE)
      : uuidv4();

    await this.client.upsert(COLLECTION, {
      wait: true,
      points: [
        {
          id,
          vector: embedding,
          payload: {
            id,
            name: payload.name,
            text: payload.text,
            type,
            ...(payload.version !== undefined
              ? { version: payload.version }
              : {}),
            ...(payload.championId !== undefined
              ? { championId: payload.championId }
              : {}),
          },
        },
      ],
    });
  }

  async search(embedding: number[]) {
    const result = await this.client.search(COLLECTION, {
      vector: embedding,
      limit: 5,
    });

    return result;
  }
}
