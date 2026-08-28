import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { PromptService } from 'src/prompt/prompt.service';

@Injectable()
export class LlmService {
  private readonly model = new ChatOpenAI({
    model: 'Qwen/Qwen3.5-35B-A3B-FP8',
    apiKey: process.env.LLM_API_KEY ?? 'not-needed',
    configuration: {
      baseURL: process.env.LLM_BASE_URL ?? 'http://192.168.14.248:12001/v1',
    },
  });

  constructor(private readonly promptService: PromptService) {}

  getModel() {
    return this.model;
  }

  async generateChat(prompt: string) {
    const response = await this.model.invoke(prompt);
    return this.contentToText(response.content);
  }

  private contentToText(content: unknown): string {
    if (typeof content === 'string') {
      return content;
    }
    if (!Array.isArray(content)) {
      return '';
    }

    let text = '';
    for (const part of content) {
      if (typeof part === 'string') {
        text += part;
      } else if (
        part &&
        typeof part === 'object' &&
        'text' in part &&
        typeof part.text === 'string'
      ) {
        text += part.text;
      }
    }
    return text;
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
