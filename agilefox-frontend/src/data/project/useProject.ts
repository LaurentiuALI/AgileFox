import { deleteProject } from "@/util/actions/project/delete-project";
import { getAllProjects } from "@/util/actions/project/get-all-project";
import { getProjectOfUser } from "@/util/actions/project/get-project-of-user";
import { getUsersOfProject } from "@/util/actions/project/get-users-of-project";
import { postProject } from "@/util/actions/project/post-project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
            return getProjectOfUser({ username });
        },
        queryKey: ["projects", username],
        enabled: !!username, 
    });
}

export function useGetUsersOfProject({ projectId }: { projectId: number }) {
    return useQuery({
        queryFn: () => getUsersOfProject({ projectId }),
        queryKey: ["users", projectId],
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            name,
            description,
            estimationType,
            abbrev,
        }: {
            name: string;
            description: string;
            estimationType: string;
            abbrev: string;
        }) => {
            return postProject({
                name,
                description,
                estimationType,
                abbrev,
            });
        },
        onError: (error) => {
            toast.error(
                `${error}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project created successfully");
        },
    });
}

export function useDeleteProject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            projectId,
        }: {
            projectId: number
        }) => {
            return deleteProject(projectId);
        },
        onError: (error) => {
            toast.error(
                `${error}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project deleted successfully");
        },
    });
}
