import ProjectsCarousel from "@/components/molecules/projects-carousel";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="text-4xl p-4">Your Projects</div>
      <ProjectsCarousel />
    </div>
  );
}
