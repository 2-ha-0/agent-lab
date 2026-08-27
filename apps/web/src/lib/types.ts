export type ChampionStats = {
  hp: number;
  damage: number;
  armor: number;
  magicResist: number;
  attackSpeed: number;
  range: number;
  mana: number;
  initialMana: number;
  critChance: number;
  critMultiplier: number;
};

export type ChampionAbility = {
  name: string;
  desc: string;
};

export type Champion = {
  id: string;
  name: string;
  cost: number;
  role: string | null;
  traits: string[];
  statsByStar: {
    '1성': ChampionStats;
    '2성': ChampionStats;
    '3성': ChampionStats;
  };
  ability: ChampionAbility;
  version?: string;
};

export type TeamSlot = {
  slotId: number;
  champion: Champion | null;
  starLevel: 1 | 2 | 3;
};

export type SynergyTier = 'inactive' | 'bronze' | 'silver' | 'gold' | 'prismatic';

export type ActiveSynergy = {
  trait: string;
  count: number;
  tier: SynergyTier;
  nextBreakpoint: number | null;
};
