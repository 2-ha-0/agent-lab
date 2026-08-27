import { Module } from '@nestjs/common';
import { ChampionModule } from 'src/champion/champion.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { ItemModule } from 'src/item/item.module';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { TraitModule } from 'src/trait/trait.module';
import { IndexingController } from './indexing.controller';
import { IndexingService } from './indexing.service';

@Module({
  controllers: [IndexingController],
  providers: [IndexingService],
  imports: [
    QdrantModule,
    EmbeddingModule,
    ChampionModule,
    ItemModule,
    TraitModule,
  ],
  exports: [IndexingService],
})
export class IndexingModule {}
