'use client';

import { Brain, CheckCircle2, ChevronDown, MessageCircle, Search, Wrench } from 'lucide-react';
import type { TraceStep } from '@/app/agent/actions';
import { cn } from '@/lib/utils';

type FlowNode = {
  type: 'question' | TraceStep['type'];
  title: string;
  detail: string;
};

const NODE_STYLES: Record<
  FlowNode['type'],
  { icon: typeof Search; ring: string; glow: string; badge: string }
> = {
  question: {
    icon: MessageCircle,
    ring: 'border-sky-400/40',
    glow: 'from-sky-500/20 to-transparent',
    badge: 'bg-sky-500/15 text-sky-200',
  },
  retrieve: {
    icon: Search,
    ring: 'border-violet-400/40',
    glow: 'from-violet-500/20 to-transparent',
    badge: 'bg-violet-500/15 text-violet-200',
  },
  model: {
    icon: Brain,
    ring: 'border-fuchsia-400/40',
    glow: 'from-fuchsia-500/25 to-transparent',
    badge: 'bg-fuchsia-500/15 text-fuchsia-200',
  },
  tool: {
    icon: Wrench,
    ring: 'border-amber-400/40',
    glow: 'from-amber-500/20 to-transparent',
    badge: 'bg-amber-500/15 text-amber-100',
  },
  end: {
    icon: CheckCircle2,
    ring: 'border-emerald-400/40',
    glow: 'from-emerald-500/20 to-transparent',
    badge: 'bg-emerald-500/15 text-emerald-200',
  },
};

const NODE_LABELS: Record<FlowNode['type'], string> = {
  question: '질문',
  retrieve: '검색',
  model: '모델',
  tool: '툴',
  end: '끝',
};

function toNodes(question: string, steps: TraceStep[]): FlowNode[] {
  const modelCount = { current: 0 };

  return [
    {
      type: 'question',
      title: '질문',
      detail: question,
    },
    ...steps.map((step) => {
      if (step.type === 'model') {
        modelCount.current += 1;
        return {
          type: step.type,
          title: `모델 ${modelCount.current}회차`,
          detail: '툴을 쓸지, 바로 답할지 판단',
        };
      }

      if (step.type === 'tool') {
        return {
          type: step.type,
          title: step.name ?? 'tool',
          detail: '도구 실행 후 결과를 모델에 전달',
        };
      }

      if (step.type === 'retrieve') {
        return {
          type: step.type,
          title: 'RAG 검색',
          detail: '질문과 관련된 문서를 먼저 찾음',
        };
      }

      return {
        type: step.type,
        title: '최종 답변',
        detail: '툴 호출 없이 답을 반환',
      };
    }),
  ];
}

export function AgentFlow({
  question,
  steps,
}: {
  question: string;
  steps: TraceStep[];
}) {
  const nodes = toNodes(question, steps);

  return (
    <div className="flex flex-col items-stretch">
      {nodes.map((node, index) => {
        const style = NODE_STYLES[node.type];
        const Icon = style.icon;

        return (
          <div key={`${node.type}-${index}`} className="flex flex-col">
            <article
              className={cn(
                'relative flex flex-col gap-3 overflow-hidden rounded-3xl border bg-card/80 p-4',
                style.ring,
              )}
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 bg-linear-to-br',
                  style.glow,
                )}
              />
              <div className="relative flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider',
                    style.badge,
                  )}
                >
                  <Icon className="size-3.5" />
                  {NODE_LABELS[node.type]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="relative flex flex-col gap-1">
                <h3 className="text-base font-semibold leading-6">
                  {node.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {node.detail}
                </p>
              </div>
            </article>

            {index < nodes.length - 1 ? (
              <div className="flex items-center justify-center py-2 text-violet-300">
                <ChevronDown className="size-5" />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function AgentFlowSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-32 animate-pulse rounded-3xl border border-border/40 bg-muted/30"
        />
      ))}
    </div>
  );
}
