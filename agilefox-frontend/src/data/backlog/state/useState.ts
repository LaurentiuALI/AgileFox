import { deleteState } from "@/util/actions/backlog/state/delete-state";
import { getProjectStates } from "@/util/actions/backlog/state/get-project-state";
import { getTypeStates } from "@/util/actions/backlog/state/get-type-state";
import { postState } from "@/util/actions/backlog/state/post-state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetProjectState({
  projectId,
}: {
  projectId: string | number;
}) {
  return useQuery({
    queryKey: ["stateProject", projectId.toString()],
    queryFn: () => getProjectStates({ projectId }),
  });
}

export function useGetTypeStates({ typeId }: { typeId: string }) {
  return useQuery({
    queryKey: ["stateType", typeId],
    queryFn: () => getTypeStates({ typeId }),
  });
}

export function useCreateProjectState() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      projectId,
      name,
      description,
      typeId,
    }: {
      projectId: string | number;
      name: string;
      description: string;
      typeId: string | number;
    }) => {
      return postState({
        projectId,
        name,
        description,
        typeId,
      });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
    onSuccess: (_newdata, variables) => {
      queryClient.invalidateQueries({ queryKey: ["stateType", variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ["stateProject", variables.projectId] });
      toast.success("State created successfully");
    }
  });
}

export function useDeleteState({ projectId }: { projectId: number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      stateId,
    }: {
      stateId: number | string,
    }) => {
      return deleteState({ stateId });
    },
    onError: (error) => {
      toast.error(
        `${error}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stateType", `${projectId}`] });
      queryClient.invalidateQueries({ queryKey: ["stateProject", `${projectId}`] });
      toast.success("State deleted successfully");
    },
  });
}
