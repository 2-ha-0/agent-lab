import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LlmClientModule } from './llm-client/llm-client.module';
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
import { TraitModule } from './trait/trait.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    LlmClientModule,
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
    TraitModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChampionToolService, ChampionService],
})
export class AppModule {}
