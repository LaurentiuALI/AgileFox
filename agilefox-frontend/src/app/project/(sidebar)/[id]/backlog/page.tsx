"use client";
import { DataTable } from "../../../../../components/molecules/backlog/data-table";
import { columns } from "../../../../../components/molecules/backlog/columns";
import { useParams } from "next/navigation";
import { useGetBacklogItems } from "@/data/get-backlogItems";
import { useSession } from "next-auth/react";
import { Settings } from "lucide-react";
import Link from "next/link";
import DataTableSkeleton from "@/components/molecules/backlog/dataTableSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Backlog() {
  const params = useParams();
  const projectId = params.id;
  const { data: session, status } = useSession();
  const userRoles = session?.user.roles;

  // Ensure projectId is a string and parse it into a number
  const parsedProjectId =
    projectId && typeof projectId === "string"
      ? parseInt(projectId, 10)
      : undefined;

  const { data, isLoading } = useGetBacklogItems({
    projectId: parsedProjectId,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <DataTableSkeleton />
      </div>
    );
  }

  if (parsedProjectId === undefined) {
    return <div>Project ID is missing</div>;
  }
  if (status === "unauthenticated") {
    return <div>You must authenticate to continue</div>;
  }

  return (
    <div className="w-full h-full">
      {userRoles?.includes("admin") && (
        <div className="flex justify-end m-2">
          <Link href={`/project/${parsedProjectId}/settings`}>
            <Settings />
          </Link>
        </div>
      )}

      <DataTable columns={columns} data={data} />
    </div>
  );
}
