import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
  buildRagPrompt(docs: string, question: string) {
    return `
        너는 유희왕 전문가이다.

        다음 정보를 참고해서 답변해라.

        검색 결과

        ${docs}

        질문

        ${question}
        `;
  }
}
