"use client";

import RefinementCard from "./card/refinementCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetCards } from "@/data/card/useCard";
import { BacklogItem } from "@/types/BacklogItem";

export default function CardCarouselMobile({
  projectId,
  backlogItem,
}: {
  projectId: string | number;
  backlogItem: BacklogItem;
}) {
  const { data, isLoading } = useGetCards({ projectId });

  if (isLoading || data == null) return <div>Loading...</div>;

  return (
    <ScrollArea className="h-full flex flex-col gap-10">
      {data
        ?.filter(
          (card) =>
            card.state.id === backlogItem?.state.id &&
            card.type.id === backlogItem?.type.id &&
            card.backlogItem?.id === backlogItem?.id
        )
        .map((card) => (
          <RefinementCard key={card.id} card={card} />
        ))}
    </ScrollArea>
  );
}
