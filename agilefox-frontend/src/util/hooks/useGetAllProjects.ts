import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../actions/project/get-all-project";

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
  });
};
