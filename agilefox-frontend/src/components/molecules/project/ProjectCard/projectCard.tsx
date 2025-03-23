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
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { canManageProject } from "@/util/roleManagement";
import { Badge } from "@/components/ui/badge";

interface IProjectCard {
  project: Project;
  assignedIssueCount: number;
}

export default function ProjectCard({
  project,
  assignedIssueCount,
}: IProjectCard) {
  const { data } = useSession();

  const manageAccess = canManageProject(data?.user.roles);

  return (
    <div className="p-1">
      <Card>
        <div className="h-full w-3 bg-gradient-to-b from-red-600 to-orange-500 rounded-l-xl bg-primary absolute" />
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-2xl">{project?.name}</CardTitle>
          {manageAccess && (
            <Link href={`/project/${project.id}/settings`}>
              <Settings size={24} />
            </Link>
          )}
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
