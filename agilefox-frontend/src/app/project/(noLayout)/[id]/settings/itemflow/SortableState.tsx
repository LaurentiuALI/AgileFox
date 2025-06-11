// app/components/SortableState.tsx
"use client";

import AddCardDialog from "@/components/molecules/settings/addCard";
import { useGetCards } from "@/data/card/useCard";
import { State } from "@/types/State";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Trash } from "lucide-react";
import { useDeleteState } from "@/data/backlog/state/useState";
import { useQueries } from "@tanstack/react-query";
import { getCheckItemByCardId } from "@/util/actions/backlog/card/checkItem/get-checkitem-by-cardId";
import CardCarouselDesktop from "./cardCarouselDesktop";
import { Button } from "@/components/ui/button";

export default function SortableState({ state }: { state: State }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: state.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const deleteState = useDeleteState({ projectId: state.projectId });

  const {
    data: allCards = [],
    isLoading: cardsLoading,
    isError: cardsError,
  } = useGetCards({ projectId: state.projectId });

  const cards = allCards.filter(
    (card) => card.state.id === state.id && card.backlogItem == null
  );

  const checkItemQueries = useQueries({
    queries: cards.map((card) => ({
      queryKey: ["checkItems", card.id],
      queryFn: () => getCheckItemByCardId({ cardId: card.id }),
    })),
  });

  if (cardsLoading) return <div>Loading cards…</div>;
  if (cardsError) return <div>Failed to load cards.</div>;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 border rounded-lg mb-2 bg-background"
    >
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          {state.name}
          <AddCardDialog
            typeId={state.typeId}
            stateId={state.id}
            projectId={state.projectId}
          />
          <Button variant={"destructive"} onClick={() => deleteState.mutate({ stateId: state.id })}>
            <Trash />
            Delete State
          </Button>
        </div>
        <Grip {...attributes} {...listeners} className="cursor-move" />
      </div>

      <div className="flex gap-4">
        <CardCarouselDesktop cards={cards} checkItems={checkItemQueries} />


      </div>
    </div >
  );
}
