import { Injectable } from '@nestjs/common';
import { ChampionService } from 'src/champion/champion.service';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { ItemService } from 'src/item/item.service';
import { QdrantService } from 'src/qdrant/qdrant.service';
import { TraitService } from 'src/trait/trait.service';
import {
  createChampionIndexerDeps,
  indexChampionRecords,
} from './champion-indexer';
import { createItemIndexerDeps, indexItemRecords } from './item-indexer';
import { createTraitIndexerDeps, indexTraitRecords } from './trait-indexer';

@Injectable()
export class IndexingService {
  constructor(
    private readonly qdrantService: QdrantService,
    private readonly embeddingService: EmbeddingService,
    private readonly championService: ChampionService,
    private readonly itemService: ItemService,
    private readonly traitService: TraitService,
  ) {}

  async indexing(name: string, text: string) {
    const embedding = await this.embeddingService.localEmbedding(text);

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
      this.embeddingService.localEmbedding(text),
    );
    const result = await indexChampionRecords(champions, deps);

    console.log(`Indexed ${result.indexed} champions to Qdrant`);

    return result;
  }

  async indexItems() {
    const items = await this.itemService.findAll();
    const deps = createItemIndexerDeps(this.qdrantService, (text) =>
      this.embeddingService.localEmbedding(text),
    );
    const result = await indexItemRecords(items, deps);

    console.log(`Indexed ${result.indexed} items to Qdrant`);

    return result;
  }

  async indexTraits() {
    const traits = await this.traitService.findAll();
    const deps = createTraitIndexerDeps(this.qdrantService, (text) =>
      this.embeddingService.localEmbedding(text),
    );
    const result = await indexTraitRecords(traits, deps);

    console.log(`Indexed ${result.indexed} traits to Qdrant`);

    return result;
  }
}
