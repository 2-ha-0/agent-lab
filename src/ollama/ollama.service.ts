import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface OllamaEmbedResponse {
  embeddings: number[][];
}

@Injectable()
export class OllamaService {
  constructor(private readonly http: HttpService) {}

  async embedding(text: string) {
    const { data } = await firstValueFrom(
      this.http.post<OllamaEmbedResponse>('http://localhost:11434/api/embed', {
        model: 'bge-m3',
        input: text,
      }),
    );

    return data.embeddings[0];
  }
}
