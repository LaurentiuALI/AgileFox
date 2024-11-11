import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Link from "next/link";
import { Project } from "@/types/Project";
import { Button } from "@/components/ui/button";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className={cn("w-[380px] h-[250] m-2")}>
      <div className="h-[250] w-[20px] bg-gradient-to-b from-orange-600 to-orange-400 rounded-l-sm bg-primary absolute" />
      <CardHeader className="ml-4">
        <CardTitle className="text-3xl">{project?.name}</CardTitle>
        <CardDescription className="h-10">
          <p className="text-white text-xl">Description</p>
          {project?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="ml-4">
        <p>Estimation type: {project?.estimationType}</p>
      </CardContent>
      <CardFooter className={cn("flex justify-center items-center")}>
        <Button asChild>
          <Link href={`project/${project.id}`}> See more </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
