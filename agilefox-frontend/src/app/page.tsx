import ProjectsCarousel from "@/components/molecules/project/ProjectCarousel/projectsCarousel";
import { getServerSession } from "next-auth/next";
import  { AuthOption }  from "@/lib/nextAuthOption";
import AddProject from "@/components/molecules/project/addProject";
import AssignedIssueList from "@/components/molecules/project/assignedIssueList";
import { canAddProject } from "@/util/roleManagement";

export default async function Home() {
  const session = await getServerSession(AuthOption);
  return session ? (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <div className="text-4xl p-4">Your Projects</div>
        {canAddProject(session.user.roles) && <AddProject />}
      </div>
      <ProjectsCarousel />
      <div className="flex justify-between">
        <div className="text-4xl p-4">Assigned to me</div>
      </div>
      <AssignedIssueList />

    </div>
  ) : (
    <div className="w-full h-full">
      <div className="text-4xl p-4">Welcome to Fox Scrum</div>
      <div className="text-2xl p-4">Please sign in to view your projects</div>
    </div>
  );
}
