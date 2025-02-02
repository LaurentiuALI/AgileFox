"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useParams } from "next/navigation";
import { useGetBacklogItems } from "@/data/get-backlogItems";
import { useSession } from "next-auth/react";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function Backlog() {
  const params = useParams();
  const projectId = params.id;
  const { data: session, status } = useSession();
  const userRoles = session?.user.roles;

  // Ensure projectId is a string and parse it into a number
  const parsedProjectId =
    projectId && typeof projectId === "string" ? parseInt(projectId, 10) : "";

  const { data } = useGetBacklogItems({ projectId: parsedProjectId });

  if (status === "unauthenticated") {
    return <div>You must authenticate to continue</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      {userRoles?.includes("admin") && (
        <div className="flex justify-end m-2">
          <Link href={`/project/${projectId}/settings`}>
            <Settings />
          </Link>
        </div>
      )}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
