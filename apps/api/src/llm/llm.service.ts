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

  async selectTools(
    question: string,
  ): Promise<{ tool: string; parameters: Record<string, any> }[]> {
    const prompt = this.promptService.buildSelectToolsPrompt(question);
    const response = await this.generate(prompt);

    console.log('response', response);

    return JSON.parse(response) as {
      tool: string;
      parameters: Record<string, any>;
    }[];
  }

  async answer(question: string, toolResults: any) {
    const prompt = this.promptService.buildAnswerPrompt(question, toolResults);
    const response = await this.generate(prompt);

    return response;
  }

  async decide(
    question: string,
    histories: {
      tool: string;
      result: unknown;
    }[],
  ): Promise<{
    type: 'tool' | 'answer';
    tool?: string;
    parameters?: Record<string, any>;
    answer?: string;
  }> {
    const prompt = this.promptService.buildDecidePrompt(question, histories);
    const response = await this.generate(prompt);

    return JSON.parse(response) as {
      type: 'tool' | 'answer';
      tool?: string;
      parameters?: Record<string, any>;
      answer?: string;
    };
  }
}
