import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '../../generated/prisma/client';
import { mapItemType, mapTrait, toInputJsonValue } from './shared';

type ItemJson = {
  name: string;
  effects: Record<string, unknown>;
  composition: string[];
  unique: boolean;
  associatedTraits: string[];
  desc: string;
};

type ItemDataFile = {
  items: Record<string, ItemJson[]>;
};

const ITEM_SECTION_TO_TYPE = {
  components: 'COMPONENT',
  completedItems: 'COMPLETED_ITEM',
  emblems: 'AMBLEM',
  set17SpecialItems: 'SET17_SPECIAL_ITEM',
} as const;

export async function seedItems(prisma: PrismaClient) {
  const version = '17.7';
  const filePath = join(process.cwd(), 'data', `tft_set${version}_item.json`);
  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw) as ItemDataFile;

  const items = Object.entries(ITEM_SECTION_TO_TYPE).flatMap(
    ([section, type]) =>
      (data.items[section] ?? []).map((item) => ({
        type: mapItemType(type),
        name: item.name,
        effects: toInputJsonValue(item.effects),
        composition: item.composition.map((value) => toInputJsonValue(value)),
        unique: item.unique,
        associatedTraits: item.associatedTraits.map(mapTrait),
        version,
        description: item.desc,
      })),
  );

  await prisma.$transaction(async (tx) => {
    await tx.item.deleteMany();
    await tx.item.createMany({ data: items });
  });

  console.log(`Seeded ${items.length} items (${version})`);
}
