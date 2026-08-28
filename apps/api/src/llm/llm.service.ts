import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LlmService {
  private readonly model = new ChatOpenAI({
    model: 'Qwen/Qwen3.5-35B-A3B-FP8',
    apiKey: process.env.LLM_API_KEY ?? 'not-needed',
    configuration: {
      baseURL: process.env.LLM_BASE_URL ?? 'http://192.168.14.248:12001/v1',
    },
  });

  getModel() {
    return this.model;
  }
}
