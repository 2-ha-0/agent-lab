'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ChampionCard } from '@/components/champions/champion-card';
import { COST_STYLES } from '@/lib/constants';
import type { Champion } from '@/lib/types';
import { cn } from '@/lib/utils';

type ChampionPoolProps = {
  champions: Champion[];
  onSelect: (champion: Champion) => void;
};

export function ChampionPool({ champions, onSelect }: ChampionPoolProps) {
  const [search, setSearch] = useState('');
  const [selectedCost, setSelectedCost] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return champions.filter((champion) => {
      const matchesSearch = champion.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCost =
        selectedCost === null || champion.cost === selectedCost;
      return matchesSearch && matchesCost;
    });
  }, [champions, search, selectedCost]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="챔피언 검색..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        {[null, 1, 2, 3, 4, 5].map((cost) => (
          <button
            key={cost ?? 'all'}
            type="button"
            onClick={() => setSelectedCost(cost)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs transition-colors',
              selectedCost === cost
                ? 'border-primary/60 bg-primary/20 text-primary-foreground'
                : 'border-border/60 bg-background/30 text-muted-foreground',
              cost !== null && selectedCost === cost && COST_STYLES[cost].badge,
            )}
          >
            {cost === null ? '전체' : `${cost}코스트`}
          </button>
        ))}
      </div>

      <div className="grid max-h-[520px] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {filtered.map((champion) => (
          <ChampionCard
            key={champion.id}
            champion={champion}
            compact
            draggable
            onClick={() => onSelect(champion)}
          />
        ))}
      </div>
    </div>
  );
}
