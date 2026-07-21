import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EmbeddingService } from './embedding.service';
import { OllamaService } from 'src/ollama/ollama.service';
import { EmbeddingController } from './embedding.controller';

@Module({
  imports: [HttpModule],
  providers: [EmbeddingService, OllamaService],
  controllers: [EmbeddingController],
})
export class EmbeddingModule {}
