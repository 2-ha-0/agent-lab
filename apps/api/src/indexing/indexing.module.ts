import { Module } from '@nestjs/common';
import { ChampionModule } from 'src/champion/champion.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { IndexingController } from './indexing.controller';
import { IndexingService } from './indexing.service';

@Module({
  controllers: [IndexingController],
  providers: [IndexingService],
  imports: [QdrantModule, EmbeddingModule, ChampionModule],
  exports: [IndexingService],
})
export class IndexingModule {}
