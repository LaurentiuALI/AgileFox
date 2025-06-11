"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../../../ui/scroll-area";
import RefinementCard from "./card/refinementCard";
import { useGetCards } from "@/data/card/useCard";
import { BacklogItem } from "@/types/BacklogItem";

export default function CardCarouselDesktop({
  projectId,
  backlogItem,
}: {
  projectId: string | number;
  backlogItem: BacklogItem;
}) {
  const { data, isError } = useGetCards({ projectId });



  if (isError) return <div>Error...</div>;

  return (
    <div className="w-full h-1/2 ">
      <ScrollArea className="h-full ">
        <div className="h-full flex gap-10">
          {data?.filter(
            (card) =>
              card.state.id === backlogItem?.state.id &&
              card.type.id === backlogItem?.type.id &&
              card.backlogItem?.id === backlogItem?.id
          )
            .map((card) => (
              <RefinementCard key={card.id} card={card} />
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
