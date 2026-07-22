import { Controller, Body, Post } from '@nestjs/common';
import { IndexingService } from './indexing.service';
import { ApiOperation } from '@nestjs/swagger';
import { IndexingDto } from './dto/indexing.dto';

@Controller('indexing')
export class IndexingController {
  constructor(private readonly indexingService: IndexingService) {}

  @Post('')
  @ApiOperation({ summary: '인덱싱' })
  async indexing(@Body() body: IndexingDto) {
    return this.indexingService.indexing(body.text);
  }
}
