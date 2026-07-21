import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OllamaModule } from './ollama/ollama.module';
import { EmbeddingModule } from './embedding/embedding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OllamaModule,
    EmbeddingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
