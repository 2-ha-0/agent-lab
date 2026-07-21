import { Controller, Get } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';

@Controller('embedding')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Get()
  async test() {
    return this.embeddingService.createEmbedding(
      '푸른 눈의 백룡은 공격력 3000의 드래곤족 몬스터이다.',
    );
  }
}
