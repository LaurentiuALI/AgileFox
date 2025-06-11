import { deleteCard } from "@/util/actions/backlog/card/delete-card-by-cardid";
import { getCardsOfProject } from "@/util/actions/backlog/card/get-card-by-project";
import { postCard } from "@/util/actions/backlog/card/post-card";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetCards({ projectId }: { projectId: string | number }) {
    return useQuery({
        queryFn: () => getCardsOfProject({ projectId }),
        queryKey: ["cardsOfProject", projectId.toString()],
    });
}

export function useCreateCard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            projectId,
            typeId,
            stateId,
            title,
            purpose,
        }: {
            projectId: string | number;
            typeId: string | number;
            stateId: string | number;
            title: string;
            purpose: string;
        }) => {
            return postCard({
                projectId,
                typeId,
                stateId,
                title: title,
                purpose: purpose,
            });
        },
        onError: (error) => {
            toast.error(`${error}`);
        },
        onSuccess: (_newdata, variables) => {
            queryClient.invalidateQueries({ queryKey: ["cardsOfProject", variables.projectId.toString()] });
            toast.success("Card created successfully");
        }
    });
}

export function useDeleteCard({ projectId }: { projectId: string | number }) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            cardId,
        }: {
            cardId: number,
        }) => {
            return deleteCard(cardId);
        },
        onError: (error) => {
            toast.error(
                `${error}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cardsOfProject", `${projectId}`] });
            queryClient.invalidateQueries({ queryKey: ["stateProject", projectId.toString()] });
            toast.success("State deleted successfully");
        },
    });
}