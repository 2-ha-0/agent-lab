import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { RagService } from './rag.service';
import { RagSearchDto } from './dto/rag-search.dto';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('search')
  async search(@Body() body: RagSearchDto) {
    return this.ragService.search(body.query);
  }
}
