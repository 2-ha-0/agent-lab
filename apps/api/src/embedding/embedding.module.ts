import { Module } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { LlmClientModule } from 'src/llm-client/llm-client.module';
import { EmbeddingController } from './embedding.controller';

@Module({
  imports: [LlmClientModule],
  providers: [EmbeddingService],
  controllers: [EmbeddingController],
  exports: [EmbeddingService],
})
export class EmbeddingModule {}
