import { Injectable } from '@nestjs/common';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { QdrantService } from 'src/qdrant/qdrant.service';

@Injectable()
export class IndexingService {
  constructor(
    private readonly qdrantService: QdrantService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async indexing(name: string, text: string) {
    const embedding = await this.embeddingService.embedding(text);

    const result = await this.qdrantService.upsert(embedding, name, text);

    console.log(result);

    return result;
  }
}
