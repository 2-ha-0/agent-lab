'use client';

import { create } from 'zustand';
import { TEAM_SIZE } from '@/lib/constants';
import type { Champion, TeamSlot } from '@/lib/types';

type TeamStore = {
  slots: TeamSlot[];
  selectedChampion: Champion | null;
  setSelectedChampion: (champion: Champion | null) => void;
  addChampion: (champion: Champion) => void;
  setChampionInSlot: (slotId: number, champion: Champion) => void;
  removeFromSlot: (slotId: number) => void;
  moveSlot: (fromSlotId: number, toSlotId: number) => void;
  setStarLevel: (slotId: number, starLevel: 1 | 2 | 3) => void;
  clearTeam: () => void;
};

function createEmptySlots(): TeamSlot[] {
  return Array.from({ length: TEAM_SIZE }, (_, index) => ({
    slotId: index,
    champion: null,
    starLevel: 1 as const,
  }));
}

export const useTeamStore = create<TeamStore>((set, get) => ({
  slots: createEmptySlots(),
  selectedChampion: null,
  setSelectedChampion: (champion) => set({ selectedChampion: champion }),
  addChampion: (champion) => {
    const slots = get().slots;
    const emptySlot = slots.find((slot) => !slot.champion);
    if (!emptySlot) return;
    get().setChampionInSlot(emptySlot.slotId, champion);
  },
  setChampionInSlot: (slotId, champion) =>
    set({
      slots: get().slots.map((slot) =>
        slot.slotId === slotId
          ? { ...slot, champion, starLevel: 1 }
          : slot,
      ),
    }),
  removeFromSlot: (slotId) =>
    set({
      slots: get().slots.map((slot) =>
        slot.slotId === slotId
          ? { ...slot, champion: null, starLevel: 1 }
          : slot,
      ),
    }),
  moveSlot: (fromSlotId, toSlotId) => {
    const slots = [...get().slots];
    const fromIndex = slots.findIndex((slot) => slot.slotId === fromSlotId);
    const toIndex = slots.findIndex((slot) => slot.slotId === toSlotId);
    if (fromIndex === -1 || toIndex === -1) return;

    const fromSlot = slots[fromIndex];
    const toSlot = slots[toIndex];

    slots[fromIndex] = {
      ...fromSlot,
      champion: toSlot.champion,
      starLevel: toSlot.champion ? toSlot.starLevel : 1,
    };
    slots[toIndex] = {
      ...toSlot,
      champion: fromSlot.champion,
      starLevel: fromSlot.champion ? fromSlot.starLevel : 1,
    };

    set({ slots });
  },
  setStarLevel: (slotId, starLevel) =>
    set({
      slots: get().slots.map((slot) =>
        slot.slotId === slotId ? { ...slot, starLevel } : slot,
      ),
    }),
  clearTeam: () => set({ slots: createEmptySlots(), selectedChampion: null }),
}));
