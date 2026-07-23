import { Body, Controller, Post } from '@nestjs/common';
import { LlmService } from './llm.service';
import { generateChatDto } from './dto/generate-chat.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('generate')
  @ApiOperation({ summary: '채팅' })
  async indexing(@Body() body: generateChatDto) {
    return this.llmService.generate(body.prompt);
  }
}
