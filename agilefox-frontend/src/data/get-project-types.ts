import { getProjectTypes } from "@/util/actions/backlog/type/get-project-type";
import { useQuery } from "@tanstack/react-query";

export function useGetProjectType({ projectId }: { projectId: string }) {
  return useQuery({
    queryFn: () => getProjectTypes({ projectId }),
    queryKey: ["stateType", projectId],
  });
}
