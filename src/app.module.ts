import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OllamaModule } from './ollama/ollama.module';
import { EmbeddingModule } from './embedding/embedding.module';
import { QdrantModule } from './qdrant/qdrant.module';
import { IndexingModule } from './indexing/indexing.module';
import { RetrievalModule } from './retrieval/retrieval.module';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OllamaModule,
    EmbeddingModule,
    QdrantModule,
    IndexingModule,
    RetrievalModule,
    LlmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
