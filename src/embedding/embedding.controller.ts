import { Controller, Get } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { OllamaService } from 'src/ollama/ollama.service';

@Controller('embedding')
export class EmbeddingController {
  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly ollamaService: OllamaService,
  ) {}

  @Get()
  async test() {
    return this.ollamaService.embedding(
      '푸른 눈의 백룡은 공격력 3000의 드래곤족 몬스터이다.',
    );
  }
}
