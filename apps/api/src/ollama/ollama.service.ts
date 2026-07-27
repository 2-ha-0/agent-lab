import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface OllamaEmbedResponse {
  embeddings: number[][];
}

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: {
    role: 'assistant';
    content: string;
  };
  done: boolean;
}

@Injectable()
export class OllamaService {
  constructor(private readonly http: HttpService) {}

  async embedding(model: string, text: string) {
    const { data } = await firstValueFrom(
      this.http.post<OllamaEmbedResponse>('http://localhost:11434/api/embed', {
        model: model,
        input: text,
      }),
    );

    return data.embeddings[0];
  }

  async chat(model: string, messages: OllamaMessage[]) {
    const { data } = await firstValueFrom(
      this.http.post<OllamaChatResponse>('http://localhost:11434/api/chat', {
        model,
        messages,
        stream: false,
      }),
    );

    console.log('chat', data);
    return data.message.content;
  }
}
