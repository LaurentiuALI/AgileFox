import { getProjectStates } from "@/util/actions/backlog/state/get-project-state";
import { useQuery } from "@tanstack/react-query";

export function useGetProjectState({ projectId }: { projectId: string }) {
  return useQuery({
    queryKey: ["stateProject", projectId],
    queryFn: () => getProjectStates({ projectId }),
  });
}
