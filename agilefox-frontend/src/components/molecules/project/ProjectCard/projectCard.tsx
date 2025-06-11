"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../ui/card";
import Link from "next/link";
import { Project } from "@/types/Project";
import { Button } from "@/components/ui/button";
import { Settings, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useDeleteProject } from "@/data/project/useProject";
import RoleGuard from "../../RoleGuard";

interface IProjectCard {
  project: Project;
  assignedIssueCount: number;
}

export default function ProjectCard({
  project,
  assignedIssueCount,
}: IProjectCard) {
  const { data } = useSession();

  const mutation = useDeleteProject();

  return (
    <div className="p-1">
      <Card>
        <div className="h-full w-3 bg-gradient-to-b from-red-600 to-orange-500 rounded-l-xl bg-primary absolute" />
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-2xl">{project?.name}</CardTitle>
          <RoleGuard roles={data?.user.roles} allowed={["admin", "product owner"]}>
            <div className="flex gap-4">
              <Link href={`/project/${project.id}/settings`}>
                <Settings size={24} />
              </Link>
              <RoleGuard roles={data?.user.roles} allowed={["admin"]}>
                <Trash className="text-red-500" onClick={() => mutation.mutate({ projectId: project.id })} />
              </RoleGuard>
            </div>
          </RoleGuard>
        </CardHeader>
        <CardContent className="md:visible">
          <CardTitle className="text-xl font-normal">Description</CardTitle>
          <CardDescription className="flex justify-between items-center">
            {project?.description}
          </CardDescription>
          <CardTitle className="text-xl font-normal pt-4 flex justify-between">
            {assignedIssueCount != 0 ? (
              <>
                <span>Assigned to me</span>
                <Badge className="border-0 bg-gradient-to-b from-red-600 to-orange-500 rounded-full">
                  {assignedIssueCount}
                </Badge>
              </>
            ) : (
              <span>No items assigned to you</span>
            )}
          </CardTitle>
        </CardContent>
        <CardFooter className={cn("flex justify-center items-center")}>
          <Button asChild className="rounded-lg">
            <Link href={`project/${project.id}`}>Go to project</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
