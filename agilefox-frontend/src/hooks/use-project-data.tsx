import { useGetCards } from "@/data/get-cards";
import { useGetProjectType } from "@/data/get-project-types";
import { useGetProjectState } from "@/data/state/get-project-states";
import { Card } from "@/types/Card";
import { State } from "@/types/State";
import { Type } from "@/types/Type";

interface ProjectData {
  cards: Card[]; // Replace with your card type if available
  states: State[];
  types: Type[];
  loading: boolean;
  error: boolean;
}

export default function useProjectData(projectId: string): ProjectData {
  const {
    data: cards,
    isLoading: cardsLoading,
    isError: cardsError,
  } = useGetCards({ projectId });
  const {
    data: states,
    isLoading: statesLoading,
    isError: statesError,
  } = useGetProjectState({
    projectId,
  });
  const {
    data: types,
    isLoading: typesLoading,
    isError: typesError,
  } = useGetProjectType({
    projectId,
  });

  return {
    cards: cards ?? [],
    states: states ?? [],
    types: types ?? [],
    loading: cardsLoading || statesLoading || typesLoading,
    error:
      cardsError || statesError || typesError || !cards || !states || !types,
  };
}
