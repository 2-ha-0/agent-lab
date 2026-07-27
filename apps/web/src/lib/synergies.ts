import {
  DEFAULT_BREAKPOINTS,
  TRAIT_BREAKPOINTS,
  TIER_LABELS,
} from './constants';
import type { ActiveSynergy, Champion, SynergyTier, TeamSlot } from './types';

function normalizeTrait(trait: string) {
  return trait.replace(/[\s.]/g, '');
}

function getBreakpoints(trait: string) {
  const key = normalizeTrait(trait);
  return TRAIT_BREAKPOINTS[key] ?? DEFAULT_BREAKPOINTS;
}

function getTier(count: number, breakpoints: number[]): SynergyTier {
  if (count < breakpoints[0]) return 'inactive';
  if (count >= breakpoints[2]) return 'gold';
  if (count >= breakpoints[1]) return 'silver';
  return 'bronze';
}

export function calculateSynergies(slots: TeamSlot[]): ActiveSynergy[] {
  const traitCounts = new Map<string, number>();

  for (const slot of slots) {
    if (!slot.champion) continue;
    for (const trait of slot.champion.traits) {
      traitCounts.set(trait, (traitCounts.get(trait) ?? 0) + 1);
    }
  }

  return Array.from(traitCounts.entries())
    .map(([trait, count]) => {
      const breakpoints = getBreakpoints(trait);
      const tier = getTier(count, breakpoints);
      const nextBreakpoint =
        breakpoints.find((value) => count < value) ?? null;

      return {
        trait,
        count,
        tier,
        nextBreakpoint,
      };
    })
    .sort((a, b) => b.count - a.count || a.trait.localeCompare(b.trait, 'ko'));
}

export function getActiveSynergies(slots: TeamSlot[]) {
  return calculateSynergies(slots).filter((synergy) => synergy.tier !== 'inactive');
}

export function getTeamSummary(slots: TeamSlot[]) {
  const filled = slots.filter((slot) => slot.champion);
  const totalCost = filled.reduce(
    (sum, slot) => sum + (slot.champion?.cost ?? 0) * slot.starLevel,
    0,
  );
  const totalHp = filled.reduce((sum, slot) => {
    const stats =
      slot.champion?.statsByStar[`${slot.starLevel}성` as '1성' | '2성' | '3성'];
    return sum + (stats?.hp ?? 0);
  }, 0);

  return {
    unitCount: filled.length,
    totalCost,
    totalHp,
    activeSynergies: getActiveSynergies(slots),
  };
}

export function formatSynergyLabel(synergy: ActiveSynergy) {
  if (synergy.tier === 'inactive') {
    return `${synergy.trait} (${synergy.count})`;
  }
  return `${synergy.trait} ${TIER_LABELS[synergy.tier]} (${synergy.count})`;
}

export function getUniqueTraits(champions: Champion[]) {
  return Array.from(
    new Set(champions.flatMap((champion) => champion.traits)),
  ).sort((a, b) => a.localeCompare(b, 'ko'));
}
