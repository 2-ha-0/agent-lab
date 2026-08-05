import { Injectable } from '@nestjs/common';
import { ChampionService } from 'src/champion/champion.service';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { QdrantService } from 'src/qdrant/qdrant.service';
import {
  createChampionIndexerDeps,
  indexChampionRecords,
} from './champion-indexer';

@Injectable()
export class IndexingService {
  constructor(
    private readonly qdrantService: QdrantService,
    private readonly embeddingService: EmbeddingService,
    private readonly championService: ChampionService,
  ) {}

  async indexing(name: string, text: string) {
    const embedding = await this.embeddingService.embedding(text);

    const result = await this.qdrantService.upsert(embedding, {
      name,
      text,
      type: 'manual',
    });

    console.log(result);

    return result;
  }

  async indexChampions() {
    const champions = await this.championService.findAll();
    const deps = createChampionIndexerDeps(this.qdrantService, (text) =>
      this.embeddingService.embedding(text),
    );
    const result = await indexChampionRecords(champions, deps);

    console.log(`Indexed ${result.indexed} champions to Qdrant`);

    return result;
  }
}
