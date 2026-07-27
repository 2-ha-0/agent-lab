'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { COST_STYLES } from '@/lib/constants';
import type { Champion } from '@/lib/types';
import { cn } from '@/lib/utils';

type ChampionCardProps = {
  champion: Champion;
  selected?: boolean;
  draggable?: boolean;
  onClick?: () => void;
  onDragStart?: () => void;
  compact?: boolean;
};

export function ChampionCard({
  champion,
  selected,
  draggable,
  onClick,
  onDragStart,
  compact,
}: ChampionCardProps) {
  const costStyle = COST_STYLES[champion.cost] ?? COST_STYLES[1];

  return (
    <Card
      draggable={draggable}
      onDragStart={(event) => {
        event.dataTransfer.setData('application/json', JSON.stringify(champion));
        onDragStart?.();
      }}
      onClick={onClick}
      className={cn(
        'cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40',
        costStyle.glow,
        selected && 'ring-2 ring-primary/70',
        compact ? 'rounded-2xl' : 'rounded-3xl',
      )}
    >
      <CardContent className={cn('p-0', compact ? 'p-3' : 'p-0')}>
        <div
          className={cn(
            'relative flex flex-col gap-3 border-b border-border/40 bg-gradient-to-br from-background/20 to-background/60',
            compact ? 'p-3' : 'p-5',
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold tracking-tight">{champion.name}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {champion.role ?? 'Specialist'}
              </p>
            </div>
            <Badge className={cn('border', costStyle.badge)}>
              {costStyle.label}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {champion.traits.map((trait) => (
              <Badge key={trait} variant="secondary" className="text-[11px]">
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-3 gap-2 p-4 text-center text-xs text-muted-foreground">
            <Stat label="HP" value={champion.statsByStar['1성'].hp} />
            <Stat label="AD" value={champion.statsByStar['1성'].damage} />
            <Stat label="AS" value={champion.statsByStar['1성'].attackSpeed} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/30 px-2 py-2">
      <p className="text-[10px] uppercase tracking-[0.2em]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
