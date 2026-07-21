import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmbeddingService } from './embedding/embedding.service';
import { EmbeddingController } from './embedding/embedding.controller';
import { OllamaModule } from './ollama/ollama.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OllamaModule,
  ],
  controllers: [AppController, EmbeddingController],
  providers: [AppService, EmbeddingService],
})
export class AppModule {}
