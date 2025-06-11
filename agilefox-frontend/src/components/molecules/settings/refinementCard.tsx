"use client";
import { Card as CardType } from "@/types/Card";
import { TooltipCard } from "../tooltipCard";
import { Card, CardContent, CardTitle } from "../../ui/cardSimple";
import CheckItemComponent from "./checkItem";
import AddCheckitemDialog from "./addCheckItem";
import { CheckItem } from "@/types/CheckItem";
import { Circle, Trash } from "lucide-react";
import { useDeleteCard } from "@/data/card/useCard";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RefinementCard({
  card,
  checkItems,
}: {
  card: CardType;
  checkItems: CheckItem[] | undefined;
}) {

  const { id } = useParams();
  if (!id || Array.isArray(id)) {
    throw new Error("Invalid ID");
  }

  const deleteCard = useDeleteCard({ projectId: id });
  return (
    <Card className="min-w-[600px] max-w-[600px] h-[300px]">
      <div className="flex items-center gap-4 mb-4 ml-4">
        <TooltipCard tooltipText={card.purpose} />
        <CardTitle className="font-semibold text-white text-xl">
          {card.title}
        </CardTitle>
        <AddCheckitemDialog cardId={card.id} />
        <Button variant="destructive" className="mt-2" onClick={() => {
          console.log("Deleting card with ID:", card.id);
          deleteCard.mutate({
            cardId: card.id,
          });
        }}>
          Delete Card
          <Trash

          />
        </Button>
      </div>
      <CardContent className="overflow-y-scroll h-[230px]">
        {(checkItems || [])
          .sort((a, b) => a.id - b.id)
          .map((ci) => (
            <div className="flex items-center gap-2 mb-2" key={ci.id} >
              <Circle size={20} className="min-w-[20px] min-h-[20px] w-5 h-5 shrink-0" />  <CheckItemComponent key={ci.id} checkItem={ci} />
            </div>
          ))}

      </CardContent>
    </Card>
  );
}
