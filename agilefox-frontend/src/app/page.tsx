import ProjectsCarousel from "@/components/molecules/projectsCarousel";
import { getServerSession } from "next-auth/next";
import { AuthOption } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(AuthOption);

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
