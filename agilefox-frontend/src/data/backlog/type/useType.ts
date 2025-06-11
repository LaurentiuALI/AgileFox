import { deleteType } from "@/util/actions/backlog/type/delete-type";
import { getProjectTypes } from "@/util/actions/backlog/type/get-project-type";
import { postType } from "@/util/actions/backlog/type/post-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetProjectType({ projectId }: { projectId: string | number }) {
  return useQuery({
    queryFn: () => getProjectTypes({ projectId }),
    queryKey: ["projectTypes", projectId.toString()],
  });
}

export function useCreateProjectType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      projectId
    }: {
      name: string;
      projectId: string | number
    }) => {
      return postType({
        name,
        projectId
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: (_newdata, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projectTypes", `${variables.projectId}`] });
      toast.success("Type created successfully");
    }
  });
}

export function useDeleteType({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      typeId
    }: {
      typeId: string | number
    }) => {
      return deleteType({
        typeId
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectTypes", `${projectId}`] });
      toast.success("Type deleted successfully");
    },
  });
}