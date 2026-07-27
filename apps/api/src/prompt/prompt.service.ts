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

  buildSelectToolPrompt(question: string) {
    return `
        너는 Tool을 선택하는 AI다.

        사용 가능한 Tool

        1.
        name: searchChampionByCost
        설명: 코스트로 챔피언을 검색한다.
        parameter:
        {
          "cost": number
        }

        2.
        name: searchChampionByName
        설명: 이름으로 챔피언을 검색한다.
        parameter:
        {
          "name": string
        }

        반드시 JSON만 출력해라.

        질문:
        ${question}`;
  }
}
