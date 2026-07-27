'use client';

import { useMemo, useState } from 'react';
import { ChampionCard } from '@/components/champions/champion-card';
import { ChampionDetailDialog } from '@/components/champions/champion-detail-dialog';
import { ChampionFilters } from '@/components/champions/champion-filters';
import type { Champion } from '@/lib/types';
import { getUniqueTraits } from '@/lib/synergies';

type ChampionsPageClientProps = {
  champions: Champion[];
};

export function ChampionsPageClient({ champions }: ChampionsPageClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCost, setSelectedCost] = useState<number | null>(null);
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const traits = useMemo(() => getUniqueTraits(champions), [champions]);

  const filtered = useMemo(() => {
    return champions.filter((champion) => {
      const matchesSearch = champion.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCost =
        selectedCost === null || champion.cost === selectedCost;
      const matchesTrait =
        selectedTrait === null || champion.traits.includes(selectedTrait);
      return matchesSearch && matchesCost && matchesTrait;
    });
  }, [champions, search, selectedCost, selectedTrait]);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[320px_1fr]">
      <ChampionFilters
        search={search}
        onSearchChange={setSearch}
        selectedCost={selectedCost}
        onCostChange={setSelectedCost}
        traits={traits}
        selectedTrait={selectedTrait}
        onTraitChange={setSelectedTrait}
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-200">
              Champion Archive
            </p>
            <h1 className="text-3xl font-bold">챔피언 도감</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {filtered.length} / {champions.length}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((champion) => (
            <ChampionCard
              key={champion.id}
              champion={champion}
              onClick={() => {
                setSelectedChampion(champion);
                setDialogOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <ChampionDetailDialog
        champion={selectedChampion}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
