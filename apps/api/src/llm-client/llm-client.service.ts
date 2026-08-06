import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { firstValueFrom } from 'rxjs';

interface EmbedResponse {
  embeddings: number[][];
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class LlmClientService {
  private readonly openai: OpenAI;

  constructor(private readonly http: HttpService) {
    this.openai = new OpenAI({
      apiKey: process.env.LLM_API_KEY ?? 'not-needed',
      baseURL: process.env.LLM_BASE_URL ?? 'http://192.168.14.248:12001/v1',
    });
  }

  async embedding(model: string, text: string) {
    const { data } = await firstValueFrom(
      this.http.post<EmbedResponse>('http://localhost:11434/api/embed', {
        model: model,
        input: text,
      }),
    );

    return data.embeddings[0];
  }

  async chat(model: string, messages: ChatMessage[]) {
    const response = await this.openai.chat.completions.create({
      model,
      messages,
      stream: false,
    });

    const content = response.choices[0]?.message?.content;
    console.log('chat', content);
    return content ?? '';
  }
}
