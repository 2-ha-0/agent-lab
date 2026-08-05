import type { TraitInfo } from '../../generated/prisma/client';

function formatJson(label: string, value: unknown): string {
  if (value === null || value === undefined) {
    return `${label}:`;
  }
  return `${label}: ${JSON.stringify(value)}`;
}

export function buildTraitEmbeddingText(trait: TraitInfo): string {
  const lines = [
    `이름: ${trait.name}`,
    `API 이름: ${trait.apiName}`,
    `종류: ${trait.kind}`,
    formatJson('브레이크포인트', trait.breakpoints),
    formatJson('챔피언', trait.champions),
  ];

  if (trait.constellation) {
    lines.push(`성좌: ${trait.constellation}`);
  }

  if (trait.description) {
    lines.push(`설명: ${trait.description}`);
  }

  return lines.join('\n');
}
