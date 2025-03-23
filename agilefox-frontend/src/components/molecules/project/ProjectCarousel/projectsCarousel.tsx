"use client";
import { useGetProjectsOfUser } from "@/data/get-projects";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/carousel";
import ProjectCard from "../ProjectCard/projectCard";
import ProjectCarouselSkeleton from "./projectCarouselSkeleton";
import { useGetBacklogItems } from "@/data/get-backlogItems";

export default function ProjectsCarousel() {
  const { data, status } = useSession();

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      if (data.user.username) {
        const username = data.user.username;
        setUsername(username);
      }
    }
  }, [data, status]);

  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjectsOfUser({
    username,
  });

  const { data: backlogItems } = useGetBacklogItems({ username });

  // Handle loading projects
  if (isLoading || status === "loading") {
    return <ProjectCarouselSkeleton />;
  }

  // Handle error state
  if (isError || projects === undefined) {
    return (
      <div className="bg-containerBackground flex justify-center">
        <div className="text-4xl p-4">Error loading project data.</div>
      </div>
    );
  }

  return (
    <div className="bg-containerBackground flex justify-center">
      <Carousel className="w-4/5 bg-containerBackground">
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem
              key={project.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard
                project={project}
                assignedIssueCount={
                  Array.isArray(backlogItems)
                    ? backlogItems.filter(
                        (backlogItem) => backlogItem.projectId === project.id
                      ).length
                    : 1
                }
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4" />
        <CarouselNext className="mr-4" />
      </Carousel>
    </div>
  );
}
