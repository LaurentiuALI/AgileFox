import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import ProjectCardSkeleton from "../ProjectCard/projectCardSkeleton";

export default function ProjectCarouselSkeleton() {
  return (
    <div className="bg-containerBackground flex items-center justify-center">
      <Carousel className="w-4/5 bg-containerBackground">
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <ProjectCardSkeleton />
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <ProjectCardSkeleton />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="ml-4" />
        <CarouselNext className="mr-4" />
      </Carousel>
    </div>
  );
}
