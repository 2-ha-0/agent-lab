import { Module } from '@nestjs/common';
import { RagService } from './rag.service';
import { RagController } from './rag.controller';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { RetrievalModule } from 'src/retrieval/retrieval.module';
import { LlmModule } from 'src/llm/llm.module';
import { PromptModule } from 'src/prompt/prompt.module';

@Module({
  controllers: [RagController],
  providers: [RagService],
  imports: [EmbeddingModule, RetrievalModule, LlmModule, PromptModule],
})
export class RagModule {}
