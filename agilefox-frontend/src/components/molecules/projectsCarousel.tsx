"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProjectCard from "./projectCard";
import { useGetProjects } from "@/data/get-projects";

export default function ProjectsCarousel() {
  const { data, isLoading } = useGetProjects();

  if (isLoading && data === undefined) {
    return (
      <div className="bg-containerBackground flex justify-center">
        <div className="text-4xl p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-containerBackground flex justify-center">
      <Carousel className="w-4/5 bg-containerBackground">
        <CarouselContent>
          {data?.map((project) => (
            <CarouselItem
              key={project.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard key={project.id} project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4" />
        <CarouselNext className="mr-4" />
      </Carousel>
    </div>
  );
}
