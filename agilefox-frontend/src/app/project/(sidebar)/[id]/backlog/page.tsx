import { AuthOption } from "@/lib/nextAuthOption";
import { Settings } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import StateAccordion from "../../../../../components/molecules/backlog/accordion/stateAccordion";

export default async function Backlog({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const session = await getServerSession(AuthOption);
  const userRoles = session?.user.roles;

  return (
    <div className="w-full h-full ">
      {userRoles?.includes("admin") && (
        <div className="flex justify-end m-2">
          <Link href={`/project/${id}/settings`}>
            <Settings />
          </Link>
        </div>
      )}

      <div className="w-full h-full flex justify-center">
        <StateAccordion projectId={id} />
      </div>
    </div>
  );
}
