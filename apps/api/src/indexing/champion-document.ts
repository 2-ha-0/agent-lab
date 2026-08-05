import type { ChampionInfo } from '../../generated/prisma/client';

type AbilityJson = {
  name?: unknown;
  desc?: unknown;
};

function asAbility(value: unknown): AbilityJson {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }
  return {};
}

function formatJsonStats(label: string, stats: unknown): string {
  if (!stats || typeof stats !== 'object') {
    return `${label}:`;
  }
  return `${label}: ${JSON.stringify(stats)}`;
}

export function buildChampionEmbeddingText(champion: ChampionInfo): string {
  const ability = asAbility(champion.ability);
  const abilityName = typeof ability.name === 'string' ? ability.name : '';
  const abilityDesc = typeof ability.desc === 'string' ? ability.desc : '';

  const lines = [
    `이름: ${champion.name}`,
    `비용: ${champion.cost}`,
    `역할: ${champion.role}`,
    `특성: ${champion.traits.join(', ')}`,
    `스킬: ${abilityName}`,
    `스킬 설명: ${abilityDesc}`,
    formatJsonStats('1성 스탯', champion.stat_1star),
    formatJsonStats('2성 스탯', champion.stat_2star),
    formatJsonStats('3성 스탯', champion.stat_3star),
  ];

  if (champion.description) {
    lines.push(`설명: ${champion.description}`);
  }

  return lines.join('\n');
}
