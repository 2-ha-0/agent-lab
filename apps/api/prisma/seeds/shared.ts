import { PrismaPg } from '@prisma/adapter-pg';
import {
  ItemType,
  Prisma,
  PrismaClient,
  Role,
  Trait,
} from '../../generated/prisma/client';

export function toInputJsonValue(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

export function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const schema =
    new URL(connectionString).searchParams.get('schema') ?? undefined;

  const adapter = new PrismaPg(
    {
      connectionString,
      ...(schema ? { options: `-c search_path="${schema}",public` } : {}),
    },
    { schema },
  );

  return new PrismaClient({ adapter });
}

export function mapRole(role: string | null): Role {
  if (role === null) {
    return Role.null;
  }

  if (!(role in Role)) {
    throw new Error(`Unknown role: ${role}`);
  }

  return Role[role as keyof typeof Role];
}

export function mapTrait(trait: string): Trait {
  const key = trait.replace(/[\s.]/g, '');

  if (!(key in Trait)) {
    throw new Error(`Unknown trait: ${trait}`);
  }

  return Trait[key as keyof typeof Trait];
}

export function mapItemType(type: string): ItemType {
  if (!(type in ItemType)) {
    throw new Error(`Unknown item type: ${type}`);
  }

  return ItemType[type as keyof typeof ItemType];
}
