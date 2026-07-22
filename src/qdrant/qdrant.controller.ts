import { Controller, Get } from '@nestjs/common';
import { QdrantService } from './qdrant.service';

@Controller('qdrant')
export class QdrantController {
  constructor(private readonly qdrantService: QdrantService) {}

  @Get('create')
  async create() {
    await this.qdrantService.createCollection();
    return 'OK';
  }
}
