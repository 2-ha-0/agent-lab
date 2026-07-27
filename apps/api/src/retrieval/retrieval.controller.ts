import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RetrievalService } from './retrieval.service';
import { RetrievalDto } from './dto/retrieval.dto';

@Controller('retrieval')
export class RetrievalController {
  constructor(private readonly retrievalService: RetrievalService) {}

  @Post('')
  @ApiOperation({ summary: '검색' })
  async retrieval(@Body() body: RetrievalDto) {
    return this.retrievalService.retrieval(body.query);
  }
}
