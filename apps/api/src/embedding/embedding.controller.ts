import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmbeddingService } from './embedding.service';

@ApiTags('embedding')
@Controller('embedding')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Get()
  @ApiOperation({ summary: '임베딩 테스트' })
  async test() {
    return this.embeddingService.embedding(
      '푸른 눈의 백룡은 공격력 3000의 드래곤족 몬스터이다.',
    );
  }
}
