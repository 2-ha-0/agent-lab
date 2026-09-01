import { Brain, CheckCircle2, Play, Search, Wrench } from 'lucide-react';

export function AgentGraphSchematic() {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <GraphNode
        icon={Play}
        label="시작"
        detail="질문을 그래프로 넘김"
        tone="sky"
      />
      <ArrowDown label="question" />
      <GraphNode
        icon={Search}
        label="retrieve"
        detail="관련 문서를 찾은 뒤, 질문이 아이템 추천인지 본다"
        tone="violet"
      />
      <div className="grid w-full max-w-xl gap-4 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-amber-400/30 bg-amber-500/5 p-4">
          <p className="text-xs uppercase tracking-wider text-amber-200">
            아이템·추천·빌드
          </p>
          <ArrowDown label="useTools = true" />
          <GraphNode
            icon={Wrench}
            label="tools"
            detail="createAgent로 챔피언/아이템 툴 호출"
            tone="amber"
          />
        </div>
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-emerald-400/30 bg-emerald-500/5 p-4">
          <p className="text-xs uppercase tracking-wider text-emerald-200">
            그 외 질문
          </p>
          <ArrowDown label="useTools = false" />
          <GraphNode
            icon={Brain}
            label="answer"
            detail="툴 없이 검색 문서만으로 답"
            tone="emerald"
          />
        </div>
      </div>
      <ArrowDown label="END" />
      <GraphNode
        icon={CheckCircle2}
        label="끝"
        detail="선택한 노드의 답을 반환"
        tone="fuchsia"
      />
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
  tone: 'sky' | 'fuchsia' | 'amber' | 'emerald' | 'violet';
}) {
  const tones = {
    sky: 'border-sky-400/40 from-sky-500/15',
    fuchsia: 'border-fuchsia-400/40 from-fuchsia-500/20',
    amber: 'border-amber-400/40 from-amber-500/15',
    emerald: 'border-emerald-400/40 from-emerald-500/15',
    violet: 'border-violet-400/40 from-violet-500/15',
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
