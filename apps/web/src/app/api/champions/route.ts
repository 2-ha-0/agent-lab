import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NextResponse } from 'next/server';

type JsonChampionFile = {
  champions: {
    list: Array<{
      name: string;
      cost: number;
      role: string | null;
      traits: string[];
      statsByStar: Record<string, Record<string, number>>;
      ability: { name: string; desc: string };
    }>;
  };
};

async function fetchFromApi() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
  const response = await fetch(`${apiUrl}/champions`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('API unavailable');
  }

  const champions = await response.json();
  return NextResponse.json({ source: 'api', champions });
}

function fetchFromJson() {
  const filePath = join(
    process.cwd(),
    '../api/data/tft_set17.7_champion.json',
  );
  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw) as JsonChampionFile;

  return NextResponse.json({
    source: 'json',
    champions: data.champions.list,
  });
}

export async function GET() {
  try {
    return await fetchFromApi();
  } catch {
    try {
      return fetchFromJson();
    } catch (error) {
      return NextResponse.json(
        {
          message: 'Failed to load champion data',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      );
    }
  }
}
