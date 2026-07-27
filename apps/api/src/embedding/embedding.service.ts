import { Injectable } from '@nestjs/common';
import { OllamaService } from 'src/ollama/ollama.service';

@Injectable()
export class EmbeddingService {
  constructor(private readonly ollamaService: OllamaService) {}

  async embedding(text: string) {
    return await this.ollamaService.embedding('bge-m3', text);
  }
}
