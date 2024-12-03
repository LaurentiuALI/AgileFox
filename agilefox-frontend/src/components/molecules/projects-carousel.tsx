"use client";
import { useGetAllProjects } from "@/util/hooks/useGetAllProjects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProjectCard from "./projectCard";

export default function ProjectsCarousel() {
  const { data } = useGetAllProjects();

  return (
    data?.length > 0 && (
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
    )
  );
}
