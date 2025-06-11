import { getCheckItemByCardId } from "@/util/actions/backlog/card/checkItem/get-checkitem-by-cardId";
import { tickCheckItem } from "@/util/actions/backlog/card/checkItem/post-tick-checkItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCheckItemByCardId({ cardId }: { cardId: number }) {
  return useQuery({
    queryFn: () => getCheckItemByCardId({ cardId }),
    queryKey: ["checkItem", cardId],
  });
}
export function useTickCheckItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ checkItemId, projectId, backlogItemId }: { checkItemId: number, projectId: number, backlogItemId: number }) => {
      console.log("ticking checkItem " + checkItemId.toString() + " for project " + projectId.toString() + " and backlogItem " + backlogItemId.toString());
      return tickCheckItem({ checkItemId })
    },
    onSuccess: (_newValue, variables) => {
      console.log("invalidating " + "cardsOfProject" + variables.projectId.toString());
      queryClient.invalidateQueries({ queryKey: ["backlogItem", variables.projectId.toString(), variables.backlogItemId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["cardsOfProject", variables.projectId.toString()] });
    }
  });
}
