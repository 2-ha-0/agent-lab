'use server';

export type TraceStep = {
  type: 'retrieve' | 'model' | 'tool' | 'end';
  name?: string;
};

export type AgentTrace = {
  answer: string;
  steps: TraceStep[];
  mermaid: string;
};

type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

function toAnswerText(content: unknown): string {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }
        if (part && typeof part === 'object' && 'text' in part) {
          return String((part as { text?: unknown }).text ?? '');
        }
        return '';
      })
      .join('');
  }

  if (content == null) {
    return '';
  }

  return String(content);
}

export async function traceAgent(
  question: string,
): Promise<ActionResult<AgentTrace>> {
  const trimmed = question.trim();

  if (!trimmed) {
    return { ok: false, error: '질문을 입력해 주세요.' };
  }

  try {
    const response = await fetch(`${API_URL}/agent/trace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: trimmed }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return { ok: false, error: '에이전트 실행에 실패했습니다.' };
    }

    const data = (await response.json()) as {
      answer: unknown;
      steps: TraceStep[];
      mermaid: string;
    };

    return {
      ok: true,
      data: {
        answer: toAnswerText(data.answer),
        steps: data.steps ?? [],
        mermaid: data.mermaid ?? '',
      },
    };
  } catch {
    return {
      ok: false,
      error: 'API 서버에 연결하지 못했습니다. Nest API가 켜져 있는지 확인해 주세요.',
    };
  }
}

export async function getAgentGraph(): Promise<ActionResult<string>> {
  try {
    const response = await fetch(`${API_URL}/agent/graph`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return { ok: false, error: '그래프를 불러오지 못했습니다.' };
    }

    return { ok: true, data: await response.text() };
  } catch {
    return {
      ok: false,
      error: 'API 서버에 연결하지 못했습니다.',
    };
  }
}
