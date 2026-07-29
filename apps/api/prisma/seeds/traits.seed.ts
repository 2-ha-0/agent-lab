import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient, TraitKind } from '../../generated/prisma/client';
import { mapTrait, toInputJsonValue } from './shared';

type TraitChampionJson = {
  name: string;
  cost: number;
  apiName: string;
};

type TraitBreakpointJson = {
  minUnits: number;
  maxUnits: number | null;
  style: number;
  variables: Record<string, number | null>;
};

type TraitJson = {
  name: string;
  apiName: string;
  desc: string;
  breakpoints: TraitBreakpointJson[];
  champions: TraitChampionJson[];
  constellation?: string;
};

type TraitDataFile = {
  traits: {
    mainTraits: TraitJson[];
    uniqueTraits: TraitJson[];
    stargazer: {
      description: string;
      champions: TraitChampionJson[];
      constellations: TraitJson[];
    };
  };
};

function toTraitRow(
  trait: TraitJson,
  kind: TraitKind,
  version: string,
  traitKeyName?: string,
) {
  return {
    apiName: trait.apiName,
    name: mapTrait(traitKeyName ?? trait.name),
    kind,
    description: trait.desc,
    breakpoints: toInputJsonValue(trait.breakpoints),
    champions: toInputJsonValue(trait.champions),
    constellation: trait.constellation ?? null,
    version,
  };
}

export async function seedTraits(prisma: PrismaClient) {
  const version = '17.7';
  const filePath = join(process.cwd(), 'data', `tft_set${version}_trait.json`);
  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw) as TraitDataFile;

  const traits = [
    ...data.traits.mainTraits.map((trait) =>
      toTraitRow(trait, TraitKind.MAIN, version),
    ),
    ...data.traits.uniqueTraits.map((trait) =>
      toTraitRow(trait, TraitKind.UNIQUE, version),
    ),
    ...data.traits.stargazer.constellations.map((trait) =>
      toTraitRow(trait, TraitKind.STARGAZER, version, '별돌보미'),
    ),
  ];

  await prisma.$transaction(async (tx) => {
    await tx.traitInfo.deleteMany({ where: { version } });
    await tx.traitInfo.createMany({ data: traits });
  });

  console.log(`Seeded ${traits.length} traits (${version})`);
}
