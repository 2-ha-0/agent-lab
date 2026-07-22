import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';

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
}
