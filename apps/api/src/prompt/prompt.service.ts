import { Injectable } from '@nestjs/common';
import { Tool } from 'src/tools/interfaces/tool.interface';

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

        반드시 JSON 객체 배열로만 출력해라.
        마크다운 코드블록, 설명 문장, 주석 없이 raw JSON만 출력해라.

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
      toolName: string;
      result: unknown;
    }[],
    tools: Tool[],
  ) {
    const toolDescriptions = tools
      .map(
        (tool) => `
          이름: ${tool.name}
          설명: ${tool.description}
          파라미터:
          ${JSON.stringify(tool.parameters)}
          `,
      )
      .join('\n');

    return `
        너는 AI Agent다.

        사용 가능한 Tool

        ${toolDescriptions}

        규칙
        1. 아직 필요한 정보가 없으면 Tool을 호출해라.
        2. 정보가 충분하면 answer를 반환해라.
        3. 반드시 JSON 객체로만 출력해라. 마크다운 코드블록, 설명 문장, 주석 없이 raw JSON만 출력해라.
        객체 타입은 { "type": "tool" | "answer", "tool"?: string, "parameters"?: { [string]: any }, "answer"?: string } 이다.
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
        4. 답변은 이전 실행 결과(Tool 결과)에 있는 데이터만 사용해라. 사전 지식, 메타 정보, 기억으로 챔피언/아이템을 추가하거나 추측하지 마라.
        5. answer에 등장하는 챔피언 이름, 아이템 이름은 반드시 이전 실행 결과에 실제로 존재하는 것만 써라. 결과에 없는 이름은 절대 쓰지 마라.
        6. 특정 챔피언 아이템 추천 요청이면 아래 순서를 반드시 지켜라.
           - 이전 실행 결과에 해당 챔피언 정보가 없으면 먼저 searchChampionByName을 호출한다.
           - 이전 실행 결과에 searchItemAll 결과가 없으면 searchItemAll을 호출한다.
           - 챔피언의 role, ability, description과 아이템의 type, effects, description을 비교해 추천한다.
           - 추천 아이템은 searchItemAll 결과 중 type이 COMPLETED_ITEM인 것만 고른다. COMPONENT, AMBLEM, SET17_SPECIAL_ITEM은 추천하지 마라.
           - 추천 이유를 쓸 때도 Tool 결과에 있는 수치/설명만 근거로 써라.

        이전 실행 결과
        ${JSON.stringify(histories)}

        질문:
        ${question}`;
  }
}
