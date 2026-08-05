import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IndexingDto } from './dto/indexing.dto';
import { IndexingService } from './indexing.service';

@Controller('indexing')
export class IndexingController {
  constructor(private readonly indexingService: IndexingService) {}

  @Post('')
  @ApiOperation({ summary: '인덱싱' })
  async indexing(@Body() body: IndexingDto) {
    return this.indexingService.indexing(body.name, body.text);
  }

  @Post('champions')
  @ApiOperation({ summary: '챔피언 DB → Qdrant 벡터 인덱싱' })
  async indexChampions() {
    return this.indexingService.indexChampions();
  }

  @Post('items')
  @ApiOperation({ summary: '아이템 DB → Qdrant 벡터 인덱싱' })
  async indexItems() {
    return this.indexingService.indexItems();
  }

  @Post('traits')
  @ApiOperation({ summary: '특성 DB → Qdrant 벡터 인덱싱' })
  async indexTraits() {
    return this.indexingService.indexTraits();
  }
}
