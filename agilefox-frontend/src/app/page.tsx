"use client";
import ProjectCard from "@/components/projectCard";
import { getAllProjects } from "@/util/actions/project/get-all-project";
import { useGetAllProjects } from "@/util/hooks/useGetAllProjects";

export default function Home() {
  const { data, isLoading } = useGetAllProjects();
  console.log("🚀 ~ Home ~ data:", data);

  return (
    data && (
      <div className="flex flex-wrap gap-2">
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    )
  );
}
