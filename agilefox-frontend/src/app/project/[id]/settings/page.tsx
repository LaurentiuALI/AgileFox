"use client";

import AddStateDialog from "@/components/molecules/settings/addState";
import AddTypeDialog from "@/components/molecules/settings/addType";
import RefinementCard from "@/components/molecules/settings/refinementCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetCards } from "@/data/get-cards";
import { useGetProjectState } from "@/data/get-project-states";
import { useGetProjectType } from "@/data/get-project-types";
import { useParams } from "next/navigation";
import AddCardDialog from "../../../../components/molecules/settings/addCard";

export default function Settings() {
  const { id } = useParams();
  if (!id || Array.isArray(id)) {
    throw new Error("Invalid ID"); // Handle missing/array case
  }
  const { data: cards, isLoading, isError } = useGetCards({ projectId: id });
  const { data: states, isLoading: isLoadingStates } = useGetProjectState({
    projectId: id,
  });
  const { data: types, isLoading: isLoadingTypes } = useGetProjectType({
    projectId: id,
  });

  if (isError) return <div>Error</div>;
  if (
    isLoading ||
    cards == null ||
    isLoadingStates ||
    states == null ||
    isLoadingTypes ||
    types == null
  )
    return <div>Loading...</div>;

  return (
    <div className="w-full h-full">
      <div className="text-4xl p-4">Settings</div>
      <div className="flex">
        <AddTypeDialog projectId={id} />
        <AddStateDialog projectId={id} />
      </div>

      <div className="w-full h-1/2 ">
        {types.map((type) =>
          states.map((state) => (
            <div key={state.id}>
              <div className="flex h-1/2 text-3xl font-bold p-4">
                {type.name} {state.name}
              </div>
              <ScrollArea key={type.id} className="h-full border-2 p-4">
                <div className="h-full  flex gap-10 items-center">
                  {cards
                    .filter(
                      (card) =>
                        card.state.id === state.id &&
                        card.type.id === type.id &&
                        card.backlogItem == null
                    )
                    .map((card) => (
                      <RefinementCard key={card.id} card={card} />
                    ))}
                  <AddCardDialog
                    typeId={type.id}
                    stateId={state.id}
                    projectId={id}
                  />
                </div>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
