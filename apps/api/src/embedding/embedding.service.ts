import { OpenAIEmbeddings } from '@langchain/openai';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface EmbedResponse {
  embeddings: number[][];
}

@Injectable()
export class EmbeddingService {
  private readonly embeddings = new OpenAIEmbeddings({
    model: 'bge-m3',
  });

  constructor(private readonly http: HttpService) {}

  // local ollama embedding
  async localEmbedding(text: string) {
    const { data } = await firstValueFrom(
      this.http.post<EmbedResponse>('http://localhost:11434/api/embed', {
        model: 'bge-m3',
        input: text,
      }),
    );

    return data.embeddings[0];
  }

  async openaiEmbedding(text: string) {
    return this.embeddings.embedQuery(text);
  }
}
