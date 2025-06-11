import { deleteBacklogItem } from "@/util/actions/backlog/backlogItem/delete-backlogItem";
import { getBacklogItem } from "@/util/actions/backlog/backlogItem/get-backlogItem";
import { getBacklogItems } from "@/util/actions/backlog/backlogItem/get-backlogItems";
import { getBacklogItemsOfUser } from "@/util/actions/backlog/backlogItem/get-backlogItems-of-user";
import { patchBacklogItem } from "@/util/actions/backlog/backlogItem/patch-backlogItem";
import { ISubmitBacklogItem, submitBacklogItem } from "@/util/actions/backlog/backlogItem/post-backlogItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetBacklogItems({
  projectId,
  backlogItemId,
  username,
}: {
  projectId?: number;
  backlogItemId?: number;
  username?: string;
}) {
  return useQuery({
    queryFn: () =>
      getBacklogItems({
        projectId: projectId as number,
        backlogItemId,
        username,
      }),
    queryKey: ["backlogItems", projectId],
    refetchInterval: 1000 * 5,
  });
}

export function useGetBacklogItemsOfUser({
  username,
}: {
  username: string;
}) {
  return useQuery({
    queryFn: () =>
      // projectId is guaranteed to exist here if enabled is true.
      getBacklogItemsOfUser({
        username,
      }),
    queryKey: ["backlogItems", username],
    // enabled: Boolean(username), // Only run the query if projectId is defined
    // enabled: projectId !== undefined || username !== undefined, // Only run the query if projectId is defined
  });
}

export function useGetBacklogItem({
  projectId,
  backlogItemId,
}: {
  projectId: number;
  backlogItemId: number;
}) {
  return useQuery({
    queryFn: () =>
      // projectId is guaranteed to exist here if enabled is true.
      getBacklogItem({
        projectId,
        backlogItemId,
      }),
    queryKey: ["backlogItem", projectId, backlogItemId],
    // enabled: projectId !== undefined || username !== undefined, // Only run the query if projectId is defined
  });
}

export function useUpdateBacklogItem() {
  return useMutation({
    mutationFn: ({
      id,
      projectId,
      username,
      title,
      description,
    }: {
      id: number;
      projectId?: number;
      username?: string;
      title?: string;
      description?: string;
    }) => patchBacklogItem({ id, projectId, username, title, description })
  })
}

export function useCreateBacklogItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (backlogItem: ISubmitBacklogItem) => submitBacklogItem(backlogItem),
    onError: (error) => {
      toast.error(
        `Error creating backlog item: ${error.message}`
      )
    },
    onSuccess: (_newdata, variables) => {
      queryClient.invalidateQueries({ queryKey: ["backlogItems", `${variables.projectId}`] });
      toast.success(
        `Backlog item created successfully!`
      )
    }
  }
  )
}

export function useDeleteBacklogItem({ projectId }: { projectId: number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (backlogItemId: number) => deleteBacklogItem(backlogItemId),
    onError: (error) => {
      toast.error(
        `Error deleting backlog item: ${error.message}`
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backlogItems", `${projectId}`] });
      toast.success(
        `Backlog item deleting successfully!`
      )
    }
  }
  )
}
