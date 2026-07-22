import { Controller, Body, Post } from '@nestjs/common';
import { IndexingService } from './indexing.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('indexing')
export class IndexingController {
  constructor(private readonly indexingService: IndexingService) {}

  @Post('')
  @ApiOperation({ summary: '인덱싱' })
  async indexing(@Body() body: { text: string }) {
    return this.indexingService.indexing(body.text);
  }
}
