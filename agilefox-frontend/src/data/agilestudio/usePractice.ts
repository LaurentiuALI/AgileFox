import { deletePractice } from "@/util/actions/agilestudio/delete-practice";
import { getPractices } from "@/util/actions/agilestudio/get-practices";
import { submitPractice } from "@/util/actions/agilestudio/post-practice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetPractices({
    projectId,
    practiceId,
}: {
    projectId: number;
    practiceId?: number;
}) {
    return useQuery({
        queryFn: () =>
            getPractices({
                projectId: projectId as number,
                practiceId: practiceId,
            }),
        queryKey: ["practices", projectId],
        enabled: projectId !== undefined || practiceId !== undefined
    });
}


export function useCreatePractice() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ title, projectId }: { title: string, projectId: number }) => submitPractice({ title, projectId }),
        onError: (error) => {
            toast.error(
                `Error creating practice: ${error.message}`
            )
        },
        onSuccess: (_newdata, variables) => {
            queryClient.invalidateQueries({ queryKey: ["practices", `${variables.projectId}`] });
            toast.success(
                `Practice created successfully!`
            )


        }
    }
    )
}

export function useDeletePractice({ projectId }: { projectId: number }) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ practiceId }: { practiceId: string }) => deletePractice(practiceId),
        onError: (error) => {
            toast.error(
                `Error deleting practice: ${error.message}`
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["practices", `${projectId}`] });
            toast.success(
                `Practice deleted successfully!`
            )


        }
    }
    )
}