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

  buildSelectToolsPrompt(question: string) {
    return `
        너는 Tool을 선택하는 AI다.

        사용 가능한 Tool

        1.
        tool: searchChampionByCost
        설명: 코스트로 챔피언을 검색한다.
        parameter:
        {
          "cost": number
        }

        2.
        tool: searchChampionByName
        설명: 이름으로 챔피언을 검색한다.
        parameter:
        {
          "name": string
        }

        반드시 객체 배열로만 출력해라.

        [
            {
                "tool": "...",
                "parameters": { ... }
            }
        ]

        질문:
        ${question}`;
  }

  buildAnswerPrompt(question: string, toolResult: any) {
    return `
        질문:
        ${question}

        검색 결과:
        ${JSON.stringify(toolResult)}

        검색 결과를 이용해서 자연스럽게 답변해줘.
    `;
  }

  buildDecidePrompt(
    question: string,
    histories: {
      tool: string;
      result: unknown;
    }[],
  ) {
    return `
        너는 AI Agent다.

        사용 가능한 Tool

        1.
        tool: searchChampionByCost
        설명: 코스트로 챔피언을 검색한다.
        parameter:
        {
          "cost": number
        }

        2.
        tool: searchChampionByName
        설명: 이름으로 챔피언을 검색한다.
        parameter:
        {
          "name": string
        }

        3.
        tool: searchItemByName
        설명: 이름으로 아이템을 검색한다.
        parameter:
        {
          "name": string
        }

        4.
        tool: searchItemByType
        설명: 타입으로 아이템을 검색한다.
        parameter:
        {
          "type": string
        }

        5.
        tool: searchItemByAD
        설명: AD 아이템 목록을 검색한다.
        parameter:
        {
        }

        6.
        tool: searchItemByAP
        설명: AP 아이템 목록을 검색한다.
        parameter:
        {
        }

        규칙
        1. 아직 필요한 정보가 없으면 Tool을 호출해라.
        2. 정보가 충분하면 answer를 반환해라.
        3. 반드시 객체로 출력해라. 객체 타입은 { "type": "tool" | "answer", "tool"?: string, "parameters"?: { [string]: any }, "answer"?: string } 이다.
        예시1
        {
          "type":"tool",
          "tool":"searchChampionByCost",
          "parameters":{
              "cost":4
          }
        }

        예시2
        {
          "type":"answer",
          "answer":"가렌을 추천합니다."
        }
        

        이전 실행 결과
        ${JSON.stringify(histories)}

        질문:
        ${question}`;
  }
}
