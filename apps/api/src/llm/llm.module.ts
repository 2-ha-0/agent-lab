import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';
import { PromptModule } from 'src/prompt/prompt.module';

@Module({
  providers: [LlmService],
  imports: [PromptModule],
  controllers: [LlmController],
  exports: [LlmService],
})
export class LlmModule {}
