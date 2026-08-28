import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { QdrantModule } from './qdrant/qdrant.module';
import { IndexingModule } from './indexing/indexing.module';
import { RetrievalModule } from './retrieval/retrieval.module';
import { ChampionModule } from './champion/champion.module';
import { PrismaModule } from './prisma/prisma.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    QdrantModule,
    IndexingModule,
    RetrievalModule,
    ChampionModule,
    PrismaModule,
    AgentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
