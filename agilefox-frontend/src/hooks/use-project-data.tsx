import { useGetCards } from "@/data/card/useCard";
import { useGetProjectType } from "@/data/backlog/type/useType";
import { useGetProjectState } from "@/data/backlog/state/useState";
import { Card } from "@/types/Card";
import { State } from "@/types/State";
import { Type } from "@/types/Type";

interface ProjectData {
  cards: Card[]; //
  states: State[];
  types: Type[];
  loading: boolean;
  error: boolean;
  isFetching: boolean;
}

export default function useProjectData(projectId: string): ProjectData {
  const {
    data: cards,
    isLoading: cardsLoading,
    isError: cardsError,
    isFetching: cardsFetching,
  } = useGetCards({ projectId });
  const {
    data: states,
    isLoading: statesLoading,
    isError: statesError,
    isFetching: statesFetching,
  } = useGetProjectState({
    projectId,
  });
  const {
    data: types,
    isLoading: typesLoading,
    isError: typesError,
    isFetching: typesFetching,
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
    isFetching: cardsFetching || statesFetching || typesFetching,
  };
}
