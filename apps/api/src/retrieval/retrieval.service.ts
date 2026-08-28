import { Injectable } from '@nestjs/common';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { QdrantService } from 'src/qdrant/qdrant.service';

@Injectable()
export class RetrievalService {
  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly qdrantService: QdrantService,
  ) {}

  async retrieve(query: string) {
    const embedding = await this.embeddingService.localEmbedding(query);
    const result = await this.qdrantService.search(embedding);

    // if (result) {
    //   return result[0]?.payload?.name;
    // } else {
    //   return null;
    // }
    return result;
  }
}
