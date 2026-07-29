import 'dotenv/config';
import { seedChampions } from './seeds/champions.seed';
import { seedItems } from './seeds/items.seed';
import { createPrismaClient } from './seeds/shared';

async function main() {
  const prisma = createPrismaClient();
  const target = (process.argv[2] ?? 'all').toLowerCase();

  try {
    if (target === 'all' || target === 'champions') {
      await seedChampions(prisma);
    }

    if (target === 'all' || target === 'items') {
      await seedItems(prisma);
    }

    if (!['all', 'champions', 'items'].includes(target)) {
      throw new Error(
        `Unknown seed target: ${target}. Use one of: all, champions, items`,
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
