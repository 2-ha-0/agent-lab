'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TIER_STYLES } from '@/lib/constants';
import { formatSynergyLabel, getActiveSynergies } from '@/lib/synergies';
import type { TeamSlot } from '@/lib/types';

type SynergyPanelProps = {
  slots: TeamSlot[];
};

export function SynergyPanel({ slots }: SynergyPanelProps) {
  const synergies = getActiveSynergies(slots);

  return (
    <Card className="border-violet-500/20 bg-gradient-to-br from-violet-950/30 to-fuchsia-950/20">
      <CardHeader>
        <CardTitle className="text-lg">활성 시너지</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {synergies.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            챔피언을 배치하면 시너지가 활성화됩니다.
          </p>
        ) : (
          synergies.map((synergy) => (
            <div
              key={synergy.trait}
              className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/30 px-4 py-3"
            >
              <div>
                <p className="font-medium">{synergy.trait}</p>
                <p className="text-xs text-muted-foreground">
                  {synergy.nextBreakpoint
                    ? `다음 단계까지 ${synergy.nextBreakpoint - synergy.count}명`
                    : '최대 단계 달성'}
                </p>
              </div>
              <Badge className={TIER_STYLES[synergy.tier]}>
                {formatSynergyLabel(synergy)}
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
