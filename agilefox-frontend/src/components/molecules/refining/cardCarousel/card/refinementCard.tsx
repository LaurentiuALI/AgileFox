"use client";
import { Card as CardType } from "@/types/Card";
import { TooltipCard } from "../../../tooltipCard";
import { Card, CardContent, CardTitle } from "../../../../ui/cardSimple";
import { useGetCheckItemByCardId } from "@/data/card/checkitem/useCheckItem";
import CheckItemComponent from "./checkItem";
import RefinementCardSkeleton from "./RefinementCardSkeleton";

export default function RefinementCard({ card }: { card: CardType }) {
  const { data, isLoading } = useGetCheckItemByCardId({ cardId: card?.id });

  if (isLoading || data == null) return <RefinementCardSkeleton />
  return (
    <Card className="w-[600px] h-[300px]">
      <div className="flex items-center gap-4 mb-4 ml-4">
        <TooltipCard tooltipText={card.purpose} />
        <CardTitle className="font-semibold text-white text-xl">
          {card?.title}
        </CardTitle>
      </div>
      <CardContent>
        {data
          ?.sort((a, b) => a.id - b.id)
          ?.map((checkItem) => (
            <CheckItemComponent key={checkItem.id} checkItem={checkItem} card={card} />
          ))}
      </CardContent>
    </Card>
  );
}
