import { getProjectStates } from "@/util/actions/backlog/state/get-project-state";
import { getTypeStates } from "@/util/actions/backlog/state/get-type-state";
import { useQuery } from "@tanstack/react-query";

export function useGetProjectState({ projectId }: { projectId: string }) {
  return useQuery({
    queryKey: ["stateProject", projectId],
    queryFn: () => getProjectStates({ projectId }),
  });
}

export function useGetTypeStates({ typeId }: { typeId: string }) {
  return useQuery({
    queryKey: ["stateType", typeId],
    queryFn: () => getTypeStates({ typeId }),
  });
}
