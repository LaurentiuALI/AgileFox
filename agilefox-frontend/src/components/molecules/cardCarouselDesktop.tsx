"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../ui/scroll-area";
import RefinementCard from "./refinementCard";
import { useGetCards } from "@/data/get-cards";
import { BacklogItem } from "@/types/BacklogItem";

export default function CardCarouselDesktop({
  projectId,
  backlogItem,
}: {
  projectId: string | number;
  backlogItem: BacklogItem;
}) {
  const { data } = useGetCards({ projectId });
  
  return (
    <div className="w-full h-1/2 ">
      <ScrollArea className="h-full ">
        <div className="h-full border-2 border-orange-500 flex gap-10">
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
         
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
