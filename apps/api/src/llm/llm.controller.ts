import { Body, Controller, Post } from '@nestjs/common';
import { LlmService } from './llm.service';
import { generateChatDto } from './dto/generate-chat.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('generate-chat')
  @ApiOperation({ summary: '채팅 테스트' })
  async generate(@Body() body: generateChatDto) {
    return this.llmService.generateChat(body.prompt);
  }
}
