import { Injectable } from '@nestjs/common';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { LlmService } from 'src/llm/llm.service';
import { PromptService } from 'src/prompt/prompt.service';
import { RetrievalService } from 'src/retrieval/retrieval.service';

@Injectable()
export class RagService {
  constructor(
    private readonly embeddingService: EmbeddingService,
    private readonly retrievalService: RetrievalService,
    private readonly llmService: LlmService,
    private readonly promptService: PromptService,
  ) {}

  async search(query: string) {
    const queryResult = await this.retrievalService.retrieval(query);

    if (queryResult.length === 0) {
      return '검색 결과가 없습니다.';
    }

    const docs = queryResult
      .map((result: any) => {
        return `제목: ${result.payload?.name}\n내용: ${result.payload?.text}`;
      })
      .join('\n');

    const prompt = this.promptService.buildRagPrompt(docs, query);
    const answer = await this.llmService.generate(prompt);

    return answer;

    // const prompt = await this.promptService.buildRagPrompt(docs, query);
  }
}
