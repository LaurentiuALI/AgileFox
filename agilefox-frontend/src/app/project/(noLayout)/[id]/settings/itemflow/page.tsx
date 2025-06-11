"use client";

import AddStateDialog from "@/components/molecules/settings/addState";
import AddTypeDialog from "@/components/molecules/settings/addType";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { State } from "@/types/State";
import { updateState } from "@/util/actions/backlog/state/update-state";

import SortableState from "./SortableState";
import useProjectData from "@/hooks/use-project-data";
import SortableList from "./SortableList";
import { SelectLabel } from "@radix-ui/react-select";
import { Trash } from "lucide-react";
import { useDeleteType } from "@/data/backlog/type/useType";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { id } = useParams();
  if (!id || Array.isArray(id)) {
    throw new Error("Invalid ID");
  }

  const { cards, states, types, loading, error, isFetching } = useProjectData(id);

  const [updating, setUpdating] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [statesList, setStatesList] = useState<State[]>([]);

  const mutation = useDeleteType({ projectId: id });
  useEffect(() => {
    if (states.length > 0) {
      const filteredStates = states.filter(
        (state) => state.typeId === Number(selectedType)
      );
      const sortedStates = filteredStates.sort(
        (a, b) => a.stateOrder - b.stateOrder
      );
      setStatesList(sortedStates);
    }
  }, [selectedType, states]);

  const handleReorder = async (newStates: State[]) => {
    setStatesList(newStates);
    setUpdating(true);
    try {
      await Promise.all(
        newStates.map((state, index) =>
          updateState({
            id: state.id,
            projectId: state.projectId,
            name: state.name,
            description: state.description,
            typeId: state.typeId,
            stateOrder: index,
          })
        )
      );
    } catch (error) {
      console.error("Failed to update state order:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !cards) return <div>Loading...</div>;
  if (error) return <div>Error loading project data.</div>;

  return (
    <div className="w-full h-full">
      <div className="text-4xl p-4">Settings</div>
      <div className="flex">
        <AddTypeDialog projectId={id} />
        {selectedType && (
          <AddStateDialog projectId={id} typeId={selectedType} />
        )}
      </div>

      <div className="w-full h-1/2 ">
        <div className="p-4 flex gap-4 items-center">
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value)}
          >
            <SelectTrigger className="flex items-center gap-2 p-4 w-1/8">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="w-56">
              <SelectGroup>
                {types.length > 0 ? types.map((type) => (
                  <SelectItem value={type.id.toString()} key={type.id}>
                    {type.name}
                  </SelectItem>
                )) : <SelectLabel className="text-neutral-400 p-2">No types found. Please add a new one</SelectLabel>}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedType && (isFetching ? "fetching.." : <Button variant={"destructive"} onClick={() => mutation.mutate({ typeId: selectedType })}> Delete Type <Trash /> </Button>)}
        </div>

        <div className="w-full h-1/2 p-4">
          <SortableList
            items={statesList}
            getId={(state) => state.id}
            onReorder={handleReorder}
          >
            {statesList.map((state) => (
              <SortableState key={state.id} state={state} />
            ))}
          </SortableList>
        </div>
      </div>
      {updating && (
        <div className="absolute inset-0 bg-slate-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
