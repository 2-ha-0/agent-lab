'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTeamSummary } from '@/lib/synergies';
import type { TeamSlot } from '@/lib/types';

type TeamStatsProps = {
  slots: TeamSlot[];
};

export function TeamStats({ slots }: TeamStatsProps) {
  const summary = getTeamSummary(slots);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">팀 요약</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Metric label="유닛" value={`${summary.unitCount}/8`} />
        <Metric label="총 코스트" value={summary.totalCost} />
        <Metric label="총 HP" value={summary.totalHp.toLocaleString()} />
        <Metric label="활성 시너지" value={summary.activeSynergies.length} />
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
