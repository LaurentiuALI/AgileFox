import RefinementCard from "@/components/molecules/settings/refinementCard";
import AddCardDialog from "@/components/molecules/settings/addCard";
import { useGetCards } from "@/data/get-cards";
import { State } from "@/types/State";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
export default function SortableState({ state }: { state: State }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: state.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    data: cards,
    isLoading,
    isError,
  } = useGetCards({
    projectId: state.projectId,
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError || cards === undefined) return <div>Error...</div>;
  else
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-4 border rounded-lg mb-2 bg-background"
      >
        <div className="w-full flex justify-between mb-10">
          {state.name} {state.id}
          <Grip
            {...listeners}
            {...attributes}
            className="cursor-move text-neutral-500"
          />
        </div>
        <div className="flex gap-4">
          {cards
            .filter(
              (card) => card.state.id == state.id && card.backlogItem == null
            )
            .map((card) => (
              <RefinementCard key={card.id} card={card} />
            ))}
          <AddCardDialog
            typeId={state.typeId}
            stateId={state.id}
            projectId={state.projectId}
          />
        </div>
        <div></div>
      </div>
    );
}
