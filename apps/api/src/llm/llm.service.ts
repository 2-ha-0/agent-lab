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

    return this.parseJsonResponse(response) as {
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

    return this.parseJsonResponse(response) as {
      type: 'tool' | 'answer';
      tool?: string;
      parameters?: Record<string, any>;
      answer?: string;
    };
  }

  /** LLM이 마크다운 코드펜스나 부가 텍스트를 붙여도 JSON만 추출해 파싱한다. */
  private parseJsonResponse(raw: string): unknown {
    const trimmed = raw.trim();
    const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    const candidate = (fenced?.[1] ?? trimmed).trim();

    try {
      return JSON.parse(candidate);
    } catch {
      const objectMatch = candidate.match(/\{[\s\S]*\}/);
      const arrayMatch = candidate.match(/\[[\s\S]*\]/);
      const embedded = objectMatch?.[0] ?? arrayMatch?.[0];
      if (!embedded) {
        throw new Error(`LLM 응답을 JSON으로 파싱할 수 없습니다: ${raw}`);
      }
      return JSON.parse(embedded);
    }
  }
}
