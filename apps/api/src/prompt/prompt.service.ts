import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
  getContextAnswerSystemPrompt() {
    return `
      너는 검색된 문서만으로 답하는 AI다.

      문서에 없는 내용은 추측하지 말고 모른다고 답하라.
      챔피언 이름, 아이템 이름은 문서에 있는 것만 써라.
    `;
  }

  getAgentSystemPrompt() {
    return `
      너는 AI Agent다.

        규칙
        1. Context만으로 답 가능하면 바로 답하고, 정보가 없거나 부족하면 Tool을 호출해라.
        2. 정보가 충분하면 최종 답변을 해라.
        3. 답변은 이전 실행 결과(Tool 결과)에 있는 데이터만 사용해라.
          사전 지식, 메타 정보, 기억으로 챔피언/아이템을 추가하거나 추측하지 마라.
        4. 답변에 등장하는 챔피언 이름, 아이템 이름은
          반드시 이전 실행 결과에 실제로 존재하는 것만 써라.
        5. 특정 챔피언 아이템 추천 요청이면 아래 순서를 반드시 지켜라.

          - 이전 실행 결과에 해당 챔피언 정보가 없으면
            먼저 searchChampionsByName을 호출한다.

          - 이전 실행 결과에 searchAllItems 결과가 없으면
            searchAllItems를 호출한다.

          - 챔피언의 role, ability, description과
            아이템의 type, effects, description을 비교해 추천한다.

          - 추천 아이템은 searchAllItems 결과 중
            type이 COMPLETED_ITEM인 것만 고른다.

          - COMPONENT, AMBLEM, SET17_SPECIAL_ITEM은 추천하지 마라.

          - 추천 이유를 쓸 때도 Tool 결과에 있는
            수치/설명만 근거로 써라.
        6. 딜러는 딜 아이템, 탱커는 방어 아이템을 추천해라.
      `;
  }

  buildAgentUserMessage(question: string, context: string) {
    return `
        질문:
        ${question}

        관련 문서:
        ${context}
      `;
  }
}
