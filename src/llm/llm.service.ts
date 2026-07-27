import { Injectable } from '@nestjs/common';
import { OllamaService } from 'src/ollama/ollama.service';
import { PromptService } from 'src/prompt/prompt.service';

@Injectable()
export class LlmService {
  constructor(
    private readonly ollamaService: OllamaService,
    private readonly promptService: PromptService,
  ) {}

  async generate(prompt: string) {
    const response = await this.ollamaService.chat('qwen3:4b', [
      {
        role: 'user',
        content: prompt,
      },
    ]);

    return response;
  }

  async selectTool(
    question: string,
  ): Promise<{ name: string; parameters: Record<string, any> }> {
    const prompt = this.promptService.buildSelectToolPrompt(question);
    const response = await this.generate(prompt);

    console.log(response);

    return JSON.parse(response) as {
      name: string;
      parameters: Record<string, any>;
    };
  }
}
