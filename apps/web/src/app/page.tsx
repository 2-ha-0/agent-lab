import Link from 'next/link';
import { ArrowRight, Sparkles, Swords, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchChampions } from '@/lib/champions';

export default async function HomePage() {
  const champions = await fetchChampions();
  const traitCount = new Set(champions.flatMap((champion) => champion.traits)).size;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-background/20 to-fuchsia-950/30 p-8 sm:p-12">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.18),transparent_60%)]" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-violet-200">
            <Sparkles className="size-3.5" />
            Set 17.7 Cosmic Forge
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            우주를 가로지르는
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
              롤토체스 팀 빌더
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {champions.length}명의 챔피언, {traitCount}개의 시너지를 탐색하고
            8칸 보드에 나만의 최강 조합을 설계하세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="glow" size="lg" asChild>
              <Link href="/builder">
                팀 빌더 시작
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/champions">챔피언 도감 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          icon={Users}
          title="챔피언 도감"
          description="코스트, 시너지, 스탯, 스킬까지 한눈에 확인"
          href="/champions"
        />
        <FeatureCard
          icon={Swords}
          title="팀 빌더"
          description="드래그 앤 드롭으로 8유닛 조합을 실시간 설계"
          href="/builder"
        />
        <FeatureCard
          icon={Zap}
          title="시너지 분석"
          description="활성 시너지와 팀 요약을 즉시 계산"
          href="/builder"
        />
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: typeof Users;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className="group transition-transform hover:-translate-y-1">
      <CardHeader>
        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200">
          <Icon className="size-5" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        <Button variant="ghost" asChild className="justify-start px-0">
          <Link href={href}>
            바로가기
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
