import { Injectable } from '@nestjs/common';
import { OllamaService } from 'src/ollama/ollama.service';

@Injectable()
export class LlmService {
  constructor(private readonly ollamaService: OllamaService) {}

  async generate(prompt: string) {
    const response = await this.ollamaService.chat('qwen3:4b', [
      {
        role: 'user',
        content: prompt,
      },
    ]);

    return response;
  }
}
