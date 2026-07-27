import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QdrantService {
  private client = new QdrantClient({
    host: 'localhost',
    port: 6333,
  });

  async createCollection() {
    await this.client.createCollection('test', {
      vectors: {
        size: 1024, //임베딩 모델의 벡터 차원(dimension)과 같아야 한다.
        distance: 'Cosine',
      },
    });
  }

  async upsert(embedding: any[], name: string, text: string) {
    const id = uuidv4();

    await this.client.upsert('test', {
      wait: true,
      points: [
        {
          id: id,
          vector: embedding,
          payload: {
            id: id,
            name: name,
            text: text,
          },
        },
      ],
    });
  }

  async search(embedding: any[]) {
    const result = await this.client.search('test', {
      vector: embedding,
      limit: 5,
    });

    return result;
  }
}
