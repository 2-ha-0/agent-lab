import type { ItemInfo } from '../../generated/prisma/client';

function formatJson(label: string, value: unknown): string {
  if (value === null || value === undefined) {
    return `${label}:`;
  }
  return `${label}: ${JSON.stringify(value)}`;
}

export function buildItemEmbeddingText(item: ItemInfo): string {
  const lines = [
    `이름: ${item.name}`,
    `타입: ${item.type}`,
    `고유: ${item.unique ? '예' : '아니오'}`,
    `관련 특성: ${item.associatedTraits.join(', ')}`,
    formatJson('효과', item.effects),
    formatJson('조합', item.composition),
  ];

  if (item.description) {
    lines.push(`설명: ${item.description}`);
  }

  return lines.join('\n');
}
