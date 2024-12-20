"use client";
import ProjectsCarousel from "@/components/molecules/projectsCarousel";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return session ? (
    <div className="w-full h-full">
      <div className="text-4xl p-4">Your Projects</div>
      <ProjectsCarousel />
    </div>
  ) : (
    <div className="w-full h-full">
      <div className="text-4xl p-4">Welcome to Fox Scrum</div>
      <div className="text-2xl p-4">Please sign in to view your projects</div>
    </div>
  );
}
