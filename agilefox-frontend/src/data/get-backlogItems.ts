import { getAllBacklogItems } from "@/util/actions/backlog/backlogItem/get-all-backlogItems";
import { useQuery } from "@tanstack/react-query";

export function useGetBacklogItems({
  projectId,
}: {
  projectId: number | string;
}) {
  return useQuery({
    queryFn: () => getAllBacklogItems({ projectId }),
    queryKey: ["backlogItems"],
  });
}
