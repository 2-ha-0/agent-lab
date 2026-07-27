'use client';

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COST_STYLES } from '@/lib/constants';
import type { Champion, TeamSlot } from '@/lib/types';
import { cn } from '@/lib/utils';

type TeamBoardProps = {
  slots: TeamSlot[];
  onDropChampion: (slotId: number, champion: Champion) => void;
  onRemove: (slotId: number) => void;
  onMove: (fromSlotId: number, toSlotId: number) => void;
  onStarChange: (slotId: number, starLevel: 1 | 2 | 3) => void;
  onClear: () => void;
};

export function TeamBoard({
  slots,
  onDropChampion,
  onRemove,
  onMove,
  onStarChange,
  onClear,
}: TeamBoardProps) {
  const [activeChampion, setActiveChampion] = useState<Champion | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(event: DragEndEvent) {
    const champion = event.active.data.current?.champion as Champion | undefined;
    const slotId = Number(event.over?.id);
    const fromSlotId = event.active.data.current?.slotId as number | undefined;

    if (champion && !Number.isNaN(slotId)) {
      if (fromSlotId !== undefined) {
        onMove(fromSlotId, slotId);
      } else {
        onDropChampion(slotId, champion);
      }
    }

    setActiveChampion(null);
  }

  return (
    <Card className="overflow-hidden border-fuchsia-500/20 bg-gradient-to-br from-background/40 via-violet-950/20 to-fuchsia-950/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">전투 보드</CardTitle>
        <Button variant="outline" size="sm" onClick={onClear}>
          팀 초기화
        </Button>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          onDragStart={(event) => {
            setActiveChampion(event.active.data.current?.champion ?? null);
          }}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {slots.map((slot) => (
              <BoardSlot
                key={slot.slotId}
                slot={slot}
                onDropChampion={onDropChampion}
                onRemove={onRemove}
                onStarChange={onStarChange}
              />
            ))}
          </div>

          <DragOverlay>
            {activeChampion ? (
              <div className="rounded-2xl border border-primary/50 bg-card/90 px-4 py-3 shadow-2xl">
                <p className="font-semibold">{activeChampion.name}</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </CardContent>
    </Card>
  );
}

function BoardSlot({
  slot,
  onDropChampion,
  onRemove,
  onStarChange,
}: {
  slot: TeamSlot;
  onDropChampion: (slotId: number, champion: Champion) => void;
  onRemove: (slotId: number) => void;
  onStarChange: (slotId: number, starLevel: 1 | 2 | 3) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: slot.slotId });

  const costStyle = slot.champion
    ? COST_STYLES[slot.champion.cost] ?? COST_STYLES[1]
    : null;

  return (
    <div
      ref={setNodeRef}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const raw = event.dataTransfer.getData('application/json');
        if (!raw) return;
        try {
          const champion = JSON.parse(raw) as Champion;
          onDropChampion(slot.slotId, champion);
        } catch {
          return;
        }
      }}
      className={cn(
        'relative min-h-36 rounded-[1.75rem] border border-dashed border-border/60 bg-background/20 p-3 transition-all',
        isOver && 'border-primary/70 bg-primary/10',
        slot.champion && costStyle?.glow,
      )}
    >
      {slot.champion ? (
        <DraggableChampionSlot
          slot={{ ...slot, champion: slot.champion }}
          costStyle={costStyle}
          onRemove={onRemove}
          onStarChange={onStarChange}
        />
      ) : (
        <div className="flex h-full min-h-28 items-center justify-center text-sm text-muted-foreground">
          드래그하여 배치
        </div>
      )}
    </div>
  );
}

function DraggableChampionSlot({
  slot,
  costStyle,
  onRemove,
  onStarChange,
}: {
  slot: TeamSlot & { champion: Champion };
  costStyle: (typeof COST_STYLES)[number] | null;
  onRemove: (slotId: number) => void;
  onStarChange: (slotId: number, starLevel: 1 | 2 | 3) => void;
}) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `slot-${slot.slotId}`,
    data: { champion: slot.champion, slotId: slot.slotId },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex h-full flex-col justify-between rounded-[1.25rem] border border-border/50 bg-card/70 p-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{slot.champion.name}</p>
          <Badge className={cn('mt-2 border', costStyle?.badge)}>
            {costStyle?.label}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => onRemove(slot.slotId)}
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1">
          {[1, 2, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onStarChange(slot.slotId, star as 1 | 2 | 3)}
              className={cn(
                'rounded-md p-1 transition-colors',
                slot.starLevel >= star
                  ? 'text-amber-300'
                  : 'text-muted-foreground/40',
              )}
            >
              <Star className="size-4 fill-current" />
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          HP {slot.champion.statsByStar[`${slot.starLevel}성` as '1성' | '2성' | '3성'].hp}
        </p>
      </div>
    </div>
  );
}
