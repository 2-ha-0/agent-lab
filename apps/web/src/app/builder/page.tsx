import { fetchChampions } from '@/lib/champions';
import { BuilderPageClient } from './builder-page-client';

export default async function BuilderPage() {
  const champions = await fetchChampions();
  return <BuilderPageClient champions={champions} />;
}
