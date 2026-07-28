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
    const response = await this.ollamaService.chat('Qwen/Qwen3.5-35B-A3B-FP8', [
      {
        role: 'user',
        content: prompt,
      },
    ]);

    return response;
  }

  async selectTool(
    question: string,
  ): Promise<{ tool: string; parameters: Record<string, any> }> {
    const prompt = this.promptService.buildSelectToolPrompt(question);
    const response = await this.generate(prompt);

    console.log('response', response);

    return JSON.parse(response) as {
      tool: string;
      parameters: Record<string, any>;
    };
  }

  async answer(question: string, toolResult: any) {
    const prompt = this.promptService.buildAnswerPrompt(question, toolResult);
    const response = await this.generate(prompt);

    return response;
  }
}
