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
import { RagModule } from './rag/rag.module';
import { PromptModule } from './prompt/prompt.module';

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
    RagModule,
    PromptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
