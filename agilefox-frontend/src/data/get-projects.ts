import { getAllProjects } from "@/util/actions/project/get-all-project";
import { getProjectOfUser } from "@/util/actions/project/get-project-of-user";
import { getUsersOfProject } from "@/util/actions/project/get-users-of-project";
import { useQuery } from "@tanstack/react-query";

export function useGetProjects() {
  return useQuery({
    queryFn: getAllProjects,
    queryKey: ["projects"],
    staleTime: Infinity,
  });
}

export function useGetProjectsOfUser({ username }: { username: string }) {
  return useQuery({
    queryFn: () => {
      if (username === null || username === undefined) {
        console.error("Username is null or undefined");
      }
      return getProjectOfUser({ username });
    },
    queryKey: ["projects", username],
    staleTime: Infinity,
  });
}

export function useGetUsersOfProject({ projectId }: { projectId: number }) {
  return useQuery({
    queryFn: () => getUsersOfProject({ projectId }),
    queryKey: ["users", projectId],
  });
}
