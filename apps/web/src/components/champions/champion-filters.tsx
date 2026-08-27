'use client';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { COST_STYLES } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ChampionFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCost: number | null;
  onCostChange: (cost: number | null) => void;
  traits: string[];
  selectedTrait: string | null;
  onTraitChange: (trait: string | null) => void;
};

export function ChampionFilters({
  search,
  onSearchChange,
  selectedCost,
  onCostChange,
  traits,
  selectedTrait,
  onTraitChange,
}: ChampionFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/50 p-5 backdrop-blur-xl">
      <Input
        placeholder="챔피언 이름 검색..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          코스트
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedCost === null ? 'default' : 'outline'}
            onClick={() => onCostChange(null)}
          >
            전체
          </Button>
          {[1, 2, 3, 4, 5].map((cost) => (
            <Button
              key={cost}
              size="sm"
              variant={selectedCost === cost ? 'default' : 'outline'}
              className={cn(selectedCost === cost && COST_STYLES[cost].badge)}
              onClick={() => onCostChange(cost)}
            >
              {cost}코스트
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          시너지
        </p>
        <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
          <Badge
            className={cn(
              'cursor-pointer',
              selectedTrait === null && 'bg-primary/20 text-primary-foreground',
            )}
            onClick={() => onTraitChange(null)}
          >
            전체
          </Badge>
          {traits.map((trait) => (
            <Badge
              key={trait}
              variant="secondary"
              className={cn(
                'cursor-pointer',
                selectedTrait === trait && 'bg-primary/20 text-primary-foreground',
              )}
              onClick={() => onTraitChange(trait)}
            >
              {trait}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
