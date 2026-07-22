import { Module } from '@nestjs/common';
import { RetrievalService } from './retrieval.service';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { QdrantModule } from 'src/qdrant/qdrant.module';
import { RetrievalController } from './retrieval.controller';

@Module({
  providers: [RetrievalService],
  imports: [EmbeddingModule, QdrantModule],
  controllers: [RetrievalController],
})
export class RetrievalModule {}
