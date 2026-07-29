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
import { ChampionToolService } from './tools/champion-tool/champion-tool.service';
import { ChampionService } from './champion/champion.service';
import { ChampionModule } from './champion/champion.module';
import { PrismaModule } from './prisma/prisma.module';
import { AgentModule } from './agent/agent.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    OllamaModule,
    EmbeddingModule,
    QdrantModule,
    IndexingModule,
    RetrievalModule,
    LlmModule,
    RagModule,
    PromptModule,
    ChampionModule,
    PrismaModule,
    AgentModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChampionToolService, ChampionService],
})
export class AppModule {}
