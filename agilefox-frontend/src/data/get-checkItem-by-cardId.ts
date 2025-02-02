import { getCheckItemByCardId } from "@/util/actions/backlog/card/checkItem/get-checkitem-by-cardId";
import { useQuery } from "@tanstack/react-query";

export function useGetCheckItemByCardId({ cardId }: { cardId: number }) {
  return useQuery({
    queryFn: () => getCheckItemByCardId({ cardId }),
    queryKey: ["checkItem", cardId],
  });
}
