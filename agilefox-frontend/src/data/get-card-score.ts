import { getBacklogItemScore } from "@/util/actions/backlog/backlogItem/get-backlogItem-score";
import { useQuery } from "@tanstack/react-query";

export function useGetBacklogItemScore({
  backlogItemId,
}: {
  backlogItemId: number | undefined;
}) {
  return useQuery({
    queryFn: () => getBacklogItemScore({ backlogItemId }),
    queryKey: ["backlgoItemScore"],
  });
}
