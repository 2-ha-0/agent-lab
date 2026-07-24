import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
  buildRagPrompt(docs: string, question: string) {
    return `
        너는 검색 결과를 기반으로만 답변하는 AI이다.

        검색 결과에 없는 내용은 추측하지 말고 모른다고 답변하라.

        검색 결과

        ${docs}

        질문

        ${question}
        `;
  }
}
