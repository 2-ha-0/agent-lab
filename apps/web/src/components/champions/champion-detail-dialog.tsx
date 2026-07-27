'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { COST_STYLES } from '@/lib/constants';
import type { Champion } from '@/lib/types';

type ChampionDetailDialogProps = {
  champion: Champion | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ChampionDetailDialog({
  champion,
  open,
  onOpenChange,
}: ChampionDetailDialogProps) {
  if (!champion) return null;

  const costStyle = COST_STYLES[champion.cost] ?? COST_STYLES[1];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-8">
            <div>
              <DialogTitle>{champion.name}</DialogTitle>
              <DialogDescription>
                {champion.role ?? 'Specialist'} · Set 17.7
              </DialogDescription>
            </div>
            <Badge className={costStyle.badge}>{costStyle.label}</Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {champion.traits.map((trait) => (
            <Badge key={trait} variant="secondary">
              {trait}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="1">
          <TabsList>
            <TabsTrigger value="1">1성</TabsTrigger>
            <TabsTrigger value="2">2성</TabsTrigger>
            <TabsTrigger value="3">3성</TabsTrigger>
          </TabsList>
          {(['1', '2', '3'] as const).map((star) => {
            const stats =
              champion.statsByStar[`${star}성` as '1성' | '2성' | '3성'];
            return (
              <TabsContent key={star} value={star}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatBlock label="HP" value={stats.hp} />
                  <StatBlock label="AD" value={stats.damage} />
                  <StatBlock label="Armor" value={stats.armor} />
                  <StatBlock label="MR" value={stats.magicResist} />
                  <StatBlock label="AS" value={stats.attackSpeed} />
                  <StatBlock label="Range" value={stats.range} />
                  <StatBlock label="Mana" value={stats.mana} />
                  <StatBlock label="Crit" value={`${(stats.critChance * 100).toFixed(0)}%`} />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
          <p className="text-sm font-semibold text-violet-200">
            {champion.ability.name}
          </p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {champion.ability.desc}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/50 p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
