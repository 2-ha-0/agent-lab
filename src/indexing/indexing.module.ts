import { Module } from '@nestjs/common';
import { IndexingService } from './indexing.service';
import { IndexingController } from './indexing.controller';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
  controllers: [IndexingController],
  providers: [IndexingService],
  imports: [QdrantModule, EmbeddingModule],
})
export class IndexingModule {}
