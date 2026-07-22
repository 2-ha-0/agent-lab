import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RetrievalService } from './retrieval.service';

@Controller('retrieval')
export class RetrievalController {
  constructor(private readonly retrievalService: RetrievalService) {}

  @Post('')
  @ApiOperation({ summary: '검색' })
  async retrieval(@Body() body: { query: string }) {
    return this.retrievalService.retrieval(body.query);
  }
}
