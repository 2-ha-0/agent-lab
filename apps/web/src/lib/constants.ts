import type { SynergyTier } from './types';

export const COST_STYLES: Record<
  number,
  { label: string; ring: string; glow: string; badge: string }
> = {
  1: {
    label: '1코스트',
    ring: 'ring-zinc-400/70',
    glow: 'shadow-[0_0_24px_rgba(161,161,170,0.35)]',
    badge: 'bg-zinc-500/20 text-zinc-200 border-zinc-400/40',
  },
  2: {
    label: '2코스트',
    ring: 'ring-emerald-400/70',
    glow: 'shadow-[0_0_24px_rgba(52,211,153,0.35)]',
    badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  },
  3: {
    label: '3코스트',
    ring: 'ring-sky-400/70',
    glow: 'shadow-[0_0_24px_rgba(56,189,248,0.35)]',
    badge: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
  },
  4: {
    label: '4코스트',
    ring: 'ring-violet-400/70',
    glow: 'shadow-[0_0_24px_rgba(167,139,250,0.35)]',
    badge: 'bg-violet-500/20 text-violet-200 border-violet-400/40',
  },
  5: {
    label: '5코스트',
    ring: 'ring-amber-400/80',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.45)]',
    badge: 'bg-amber-500/20 text-amber-100 border-amber-400/50',
  },
};

export const TRAIT_BREAKPOINTS: Record<string, number[]> = {
  NOVA: [2, 4, 6],
  길잡이: [2, 3, 4],
  도전자: [2, 4, 6],
  동물특공대: [2, 4, 6],
  메카: [2, 4, 6],
  복제자: [2, 4],
  불한당: [2, 4, 6],
  선봉대: [2, 4, 6],
  습격자: [2, 4, 6],
  시간균열자: [2, 4, 6],
  싸움꾼: [2, 4, 6],
  암흑의별: [2, 4, 6],
  여행자: [2, 4, 6],
  요새: [2, 4, 6],
  우주그루브: [2, 4, 6],
  운명술사: [2, 4, 6],
  저격수: [2, 4, 6],
  전달자: [2, 4, 6],
  정령족: [2, 4, 6],
  중재자: [2, 4, 6],
  초능력: [2, 4, 6],
  최신상: [2, 4, 6],
  태고족: [2, 4, 6],
  구원자: [2, 4, 6],
  기동총격여신: [2, 4, 6],
  말살자: [2, 4, 6],
  보루: [2, 4, 6],
  신성결투가: [2, 4, 6],
  어둠의여인: [2, 4, 6],
  예언자: [2, 4, 6],
  은하계사냥꾼: [2, 4, 6],
  지휘관: [2, 4, 6],
  특성선택: [1, 2, 3],
  파멸자: [2, 4, 6],
  파티광: [2, 4, 6],
  별돌보미: [2, 4, 6],
};

export const DEFAULT_BREAKPOINTS = [2, 4, 6];

export const TIER_LABELS: Record<SynergyTier, string> = {
  inactive: '비활성',
  bronze: '브론즈',
  silver: '실버',
  gold: '골드',
  prismatic: '프리즘',
};

export const TIER_STYLES: Record<SynergyTier, string> = {
  inactive: 'bg-muted/40 text-muted-foreground border-border/40',
  bronze: 'bg-orange-950/50 text-orange-200 border-orange-500/40',
  silver: 'bg-slate-700/50 text-slate-100 border-slate-300/40',
  gold: 'bg-amber-900/50 text-amber-100 border-amber-400/50',
  prismatic: 'bg-fuchsia-900/50 text-fuchsia-100 border-fuchsia-400/50',
};

export const TEAM_SIZE = 8;
