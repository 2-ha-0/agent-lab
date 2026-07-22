import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QdrantService } from './qdrant.service';

@ApiTags('qdrant')
@Controller('qdrant')
export class QdrantController {
  constructor(private readonly qdrantService: QdrantService) {}

  @Get('create')
  @ApiOperation({ summary: 'Qdrant 컬렉션 생성' })
  async create() {
    await this.qdrantService.createCollection();
    return 'OK';
  }
}
