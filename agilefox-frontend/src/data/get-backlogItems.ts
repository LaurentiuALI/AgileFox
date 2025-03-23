import { getBacklogItems } from "@/util/actions/backlog/backlogItem/get-backlogItem";
import { useQuery } from "@tanstack/react-query";

export function useGetBacklogItems({
  projectId,
  backlogItemId,
  username,
}: {
  projectId?: number;
  backlogItemId?: number;
  username?: string;
}) {
  return useQuery({
    queryFn: () =>
      // projectId is guaranteed to exist here if enabled is true.
      getBacklogItems({
        projectId: projectId as number,
        backlogItemId,
        username,
      }),
    queryKey: ["backlogItems", projectId, backlogItemId, username],
    enabled: projectId !== undefined || username !== undefined, // Only run the query if projectId is defined
  });
}
