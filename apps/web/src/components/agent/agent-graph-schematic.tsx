import { Brain, CheckCircle2, Play, Wrench } from 'lucide-react';

export function AgentGraphSchematic() {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <GraphNode
        icon={Play}
        label="시작"
        detail="질문 + RAG 문서를 모델에 전달"
        tone="sky"
      />
      <ArrowDown label="messages" />
      <GraphNode
        icon={Brain}
        label="모델"
        detail="툴을 호출할지, 바로 답할지 결정"
        tone="fuchsia"
      />
      <div className="grid w-full max-w-xl gap-4 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-amber-400/30 bg-amber-500/5 p-4">
          <p className="text-xs uppercase tracking-wider text-amber-200">
            툴이 필요하면
          </p>
          <ArrowDown label="tool_calls" />
          <GraphNode
            icon={Wrench}
            label="툴 실행"
            detail="searchChampionsByName 등을 호출"
            tone="amber"
          />
          <ArrowDown label="ToolMessage" />
          <p className="text-center text-sm text-muted-foreground">
            결과를 들고 다시 모델로
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-4">
          <p className="text-xs uppercase tracking-wider text-emerald-200">
            바로 답할 수 있으면
          </p>
          <ArrowDown label="final answer" />
          <GraphNode
            icon={CheckCircle2}
            label="끝"
            detail="툴 없이 최종 답변 반환"
            tone="emerald"
          />
        </div>
      </div>
    </div>
  );
}

function GraphNode({
  icon: Icon,
  label,
  detail,
  tone,
}: {
  icon: typeof Brain;
  label: string;
  detail: string;
  tone: 'sky' | 'fuchsia' | 'amber' | 'emerald';
}) {
  const tones = {
    sky: 'border-sky-400/40 from-sky-500/15',
    fuchsia: 'border-fuchsia-400/40 from-fuchsia-500/20',
    amber: 'border-amber-400/40 from-amber-500/15',
    emerald: 'border-emerald-400/40 from-emerald-500/15',
  };

  return (
    <div
      className={`w-full max-w-sm rounded-3xl border bg-linear-to-br ${tones[tone]} to-transparent p-4`}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-background/40">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-muted-foreground">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function ArrowDown({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-violet-300">
      <div className="h-6 w-px bg-violet-400/50" />
      <span className="rounded-full border border-violet-400/30 bg-background/50 px-2 py-0.5 font-mono text-[11px]">
        {label}
      </span>
      <div className="h-6 w-px bg-violet-400/50" />
    </div>
  );
}
