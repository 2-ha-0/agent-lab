import type { Champion } from './types';

type ApiChampion = {
  id: string;
  name: string;
  cost: number;
  role: string | null;
  traits: string[];
  stat_1star: Record<string, number>;
  stat_2star: Record<string, number>;
  stat_3star: Record<string, number>;
  ability: { name: string; desc: string };
  version?: string;
};

type JsonChampion = {
  name: string;
  cost: number;
  role: string | null;
  traits: string[];
  statsByStar: Champion['statsByStar'];
  ability: Champion['ability'];
};

function mapApiChampion(champion: ApiChampion): Champion {
  return {
    id: champion.id,
    name: champion.name,
    cost: champion.cost,
    role: champion.role,
    traits: champion.traits,
    statsByStar: {
      '1성': champion.stat_1star as Champion['statsByStar']['1성'],
      '2성': champion.stat_2star as Champion['statsByStar']['2성'],
      '3성': champion.stat_3star as Champion['statsByStar']['3성'],
    },
    ability: champion.ability,
    version: champion.version,
  };
}

function mapJsonChampion(champion: JsonChampion, index: number): Champion {
  return {
    id: `${champion.name}-${index}`,
    name: champion.name,
    cost: champion.cost,
    role: champion.role,
    traits: champion.traits,
    statsByStar: champion.statsByStar,
    ability: champion.ability,
  };
}

export async function fetchChampions(): Promise<Champion[]> {
  const baseUrl =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_WEB_URL ?? 'http://localhost:3001'
      : '';

  const response = await fetch(`${baseUrl}/api/champions`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to load champions');
  }

  const data = (await response.json()) as {
    champions: JsonChampion[] | ApiChampion[];
    source: 'json' | 'api';
  };

  if (data.source === 'api') {
    return (data.champions as ApiChampion[]).map(mapApiChampion);
  }

  return (data.champions as JsonChampion[]).map(mapJsonChampion);
}
