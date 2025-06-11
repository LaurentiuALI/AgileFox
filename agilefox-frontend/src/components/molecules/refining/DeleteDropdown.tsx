"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteBacklogItem } from "@/data/backlog/backlogItem/useBacklogItem";
import { MoreHorizontal } from "lucide-react";

export default function DeleteDropdown({ backlogItemId, projectId }: {
    backlogItemId: number; projectId: number;
}) {
    const deleteMutation = useDeleteBacklogItem({ projectId });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onSelect={() => deleteMutation.mutate(backlogItemId)}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}