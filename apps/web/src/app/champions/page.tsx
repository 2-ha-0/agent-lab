import { fetchChampions } from '@/lib/champions';
import { ChampionsPageClient } from './champions-page-client';

export default async function ChampionsPage() {
  const champions = await fetchChampions();
  return <ChampionsPageClient champions={champions} />;
}
