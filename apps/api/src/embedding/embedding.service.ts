import { Injectable } from '@nestjs/common';
import { LlmClientService } from 'src/llm-client/llm-client.service';

@Injectable()
export class EmbeddingService {
  constructor(private readonly llmClientService: LlmClientService) {}

  async embedding(text: string) {
    return await this.llmClientService.embedding('bge-m3', text);
  }
}
