import { OpenAIEmbeddings } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { LlmClientService } from 'src/llm-client/llm-client.service';

@Injectable()
export class EmbeddingService {
  private readonly embeddings = new OpenAIEmbeddings({
    model: 'bge-m3',
  });

  constructor(private readonly llmClientService: LlmClientService) {}

  async embedding(text: string) {
    return await this.llmClientService.embedding('bge-m3', text);
  }

  async embed(text: string) {
    return this.embeddings.embedQuery(text);
  }
}
