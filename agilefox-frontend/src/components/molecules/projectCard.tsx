import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";
import { Project } from "@/types/Project";
import { Button } from "@/components/ui/button";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{project?.name}</CardTitle>
          <CardDescription>{project?.description}</CardDescription>
        </CardHeader>
        <CardContent className="md:visible">
          Estimation type: {project?.estimationType}
        </CardContent>
        <CardFooter className={cn("flex justify-center items-center")}>
          <Button asChild>
            <Link href={`project/${project.id}`}> See more </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
