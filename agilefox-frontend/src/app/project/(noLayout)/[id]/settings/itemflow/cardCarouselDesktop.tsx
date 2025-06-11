"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import RefinementCard from "@/components/molecules/settings/refinementCard";
import { Card } from "@/types/Card";
import { CheckItem } from "@/types/CheckItem";
import { UseQueryResult } from "@tanstack/react-query";

export default function CardCarouselDesktop({
  cards,
  checkItems
}: {
  cards: Card[];
  checkItems: UseQueryResult<{
    id: number;
    cardId: number;
    checked: boolean;
    information: string;
  }[] | undefined, Error>[]
}) {
  return (
    <div className="w-full h-1/2 ">
      <ScrollArea className="h-full ">
        <div className="h-full flex gap-10">
          {cards.map((card, idx) => (
            <RefinementCard key={card.id} card={card} checkItems={(checkItems[idx].data!) as CheckItem[]} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
