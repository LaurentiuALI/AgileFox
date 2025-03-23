import { getAllUsers } from "@/util/actions/user/get-all-users";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  return useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });
}
