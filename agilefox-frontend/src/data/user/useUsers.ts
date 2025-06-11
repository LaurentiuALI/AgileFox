import { getUsersOfProject } from "@/util/actions/project/get-users-of-project";
import { getAllUsers } from "@/util/actions/user/get-all-users";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers() {
  return useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });
}
export function useGetProjectUsers({ projectId }: { projectId: number }) {
  return useQuery({
    queryFn: () => getUsersOfProject({ projectId }),
    queryKey: ["user", projectId],
  });
}
