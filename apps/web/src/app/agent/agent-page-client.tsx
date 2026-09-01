'use client';

import { FormEvent, useState } from 'react';
import { Loader2, Send, Workflow } from 'lucide-react';
import {
  getAgentGraph,
  traceAgent,
  type AgentTrace,
} from '@/app/agent/actions';
import { AgentFlow, AgentFlowSkeleton } from '@/components/agent/agent-flow';
import { AgentGraphSchematic } from '@/components/agent/agent-graph-schematic';
import { MarkdownContent } from '@/components/agent/markdown-content';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EXAMPLES = [
  '가렌 아이템 추천해줘',
  '4코스트 챔피언 알려줘',
  '벨코즈 시너지 알려줘',
];

export function AgentPageClient() {
  const [question, setQuestion] = useState(EXAMPLES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trace, setTrace] = useState<AgentTrace | null>(null);
  const [graph, setGraph] = useState('');
  const [graphError, setGraphError] = useState('');
  const [graphLoading, setGraphLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const result = await traceAgent(question);

    if (!result.ok) {
      setTrace(null);
      setError(result.error);
    } else {
      setTrace(result.data);
    }

    setLoading(false);
  }

  async function handleGraphTab(value: string) {
    if (value !== 'graph' || graph || graphLoading) {
      return;
    }

    setGraphLoading(true);
    const result = await getAgentGraph();

    if (!result.ok) {
      setGraphError(result.error);
    } else {
      setGraph(result.data);
    }

    setGraphLoading(false);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
      <section className="flex flex-col gap-3">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-violet-200">
          <Workflow className="size-3.5" />
          Agent Trace
        </p>
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          이번 질문이 지나간 길을
          <span className="block bg-linear-to-r from-violet-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
            눈으로 따라가기
          </span>
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          질문을 보내면 아이템 추천인지로 길이 갈립니다. 추천이면 툴
          에이전트, 아니면 검색 문서만으로 답합니다.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>질문</CardTitle>
          <CardDescription>
            실행에는 시간이 걸릴 수 있습니다. 모델이 툴을 여러 번 부르면 더
            오래 걸립니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={3}
              placeholder="예: 가렌 아이템 추천해줘"
              className="w-full resize-y rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm leading-6 outline-none placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((example) => (
                <Button
                  key={example}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuestion(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
            <Button type="submit" variant="glow" disabled={loading}>
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {loading ? '에이전트 실행 중' : '경로 그리기'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="trace" onValueChange={handleGraphTab}>
        <TabsList>
          <TabsTrigger value="trace">이번 실행</TabsTrigger>
          <TabsTrigger value="graph">전체 설계도</TabsTrigger>
        </TabsList>

        <TabsContent value="trace">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>실행 경로</CardTitle>
                <CardDescription>
                  위에서 아래로 실제로 지나간 순서입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <AgentFlowSkeleton /> : null}
                {!loading && error ? (
                  <p className="text-sm text-fuchsia-200">{error}</p>
                ) : null}
                {!loading && !error && !trace ? (
                  <p className="text-sm text-muted-foreground">
                    질문을 실행하면 검색, 모델, 툴이 어떤 순서로 이어지는지
                    여기에 그려집니다.
                  </p>
                ) : null}
                {!loading && trace ? (
                  <AgentFlow question={question} steps={trace.steps} />
                ) : null}
              </CardContent>
            </Card>

            {trace ? (
              <Card>
                <CardHeader>
                  <CardTitle>최종 답변</CardTitle>
                </CardHeader>
                <CardContent>
                  <MarkdownContent>{trace.answer}</MarkdownContent>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>LangGraph 설계도</CardTitle>
              <CardDescription>
                질문과 무관한 고정 구조입니다. 검색 뒤에 아이템 추천 여부로
                길이 갈라집니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {graphLoading ? (
                <div className="h-48 animate-pulse rounded-3xl border border-border/40 bg-muted/30" />
              ) : null}
              {graphError ? (
                <p className="text-sm text-fuchsia-200">{graphError}</p>
              ) : null}
              <AgentGraphSchematic />
              {graph ? (
                <pre className="overflow-x-auto rounded-2xl border border-border/40 bg-background/40 p-4 text-xs leading-6 text-muted-foreground">
                  {graph}
                </pre>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
