import { Module } from '@nestjs/common';
import { LlmClientService } from './llm-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [LlmClientService],
  exports: [LlmClientService],
  imports: [HttpModule],
})
export class LlmClientModule {}
