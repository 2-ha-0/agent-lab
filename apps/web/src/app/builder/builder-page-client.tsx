'use client';

import { ChampionPool } from '@/components/builder/champion-pool';
import { SynergyPanel } from '@/components/builder/synergy-panel';
import { TeamBoard } from '@/components/builder/team-board';
import { TeamStats } from '@/components/builder/team-stats';
import type { Champion } from '@/lib/types';
import { useTeamStore } from '@/store/team-store';

type BuilderPageClientProps = {
  champions: Champion[];
};

export function BuilderPageClient({ champions }: BuilderPageClientProps) {
  const slots = useTeamStore((state) => state.slots);
  const addChampion = useTeamStore((state) => state.addChampion);
  const setChampionInSlot = useTeamStore((state) => state.setChampionInSlot);
  const removeFromSlot = useTeamStore((state) => state.removeFromSlot);
  const moveSlot = useTeamStore((state) => state.moveSlot);
  const setStarLevel = useTeamStore((state) => state.setStarLevel);
  const clearTeam = useTeamStore((state) => state.clearTeam);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 xl:grid-cols-[360px_1fr]">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200">
            Team Forge
          </p>
          <h1 className="text-3xl font-bold">팀 빌더</h1>
        </div>
        <div className="rounded-3xl border border-border/60 bg-card/50 p-4 backdrop-blur-xl">
          <ChampionPool champions={champions} onSelect={addChampion} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <TeamBoard
          slots={slots}
          onDropChampion={setChampionInSlot}
          onRemove={removeFromSlot}
          onMove={moveSlot}
          onStarChange={setStarLevel}
          onClear={clearTeam}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <SynergyPanel slots={slots} />
          <TeamStats slots={slots} />
        </div>
      </div>
    </div>
  );
}
