import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmClientModule } from 'src/llm-client/llm-client.module';
import { LlmController } from './llm.controller';
import { PromptModule } from 'src/prompt/prompt.module';

@Module({
  providers: [LlmService],
  imports: [LlmClientModule, PromptModule],
  controllers: [LlmController],
  exports: [LlmService],
})
export class LlmModule {}
