import { getAllProjects } from "@/util/actions/project/get-all-project";
import { useQuery } from "@tanstack/react-query";

export function useGetProjects() {
  return useQuery({
    queryFn: getAllProjects,
    queryKey: ["projects"],
    // staleTime: 0,
  });
}
