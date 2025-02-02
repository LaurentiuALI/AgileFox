import { getCardsOfProject } from "@/util/actions/backlog/card/get-card-by-project";
import { useQuery } from "@tanstack/react-query";

export function useGetCards({ projectId }: { projectId: string | number }) {
  return useQuery({
    queryFn: () => getCardsOfProject({ projectId }),
    queryKey: ["cardsOfProject", projectId],
  });
}
