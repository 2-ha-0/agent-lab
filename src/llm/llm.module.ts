import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { OllamaModule } from 'src/ollama/ollama.module';
import { LlmController } from './llm.controller';

@Module({
  providers: [LlmService],
  imports: [OllamaModule],
  controllers: [LlmController],
  exports: [LlmService],
})
export class LlmModule {}
