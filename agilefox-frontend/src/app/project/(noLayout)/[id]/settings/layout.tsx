import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RoleGuard from "@/components/molecules/RoleGuard";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/nextAuthOption";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const session = await getServerSession(AuthOption);

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel maxSize={15} className="hidden lg:block">
          <div
            className={`bg-containerBackground h-full flex flex-col gap-8 p-4`}
          >
            <Link href={`/project/${id}/settings/itemflow`}>
              <Button className="w-full h-12" variant="secondary">
                Itemflow
              </Button>
            </Link>
            <RoleGuard roles={session?.user.roles} allowed={["admin"]}>
              <Link href={`/project/${id}/settings/people `}>
                <Button className="w-full h-12" variant="secondary">
                  People
                </Button>
              </Link>
            </RoleGuard>
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-transparent hover:bg-secondary" />
        <ResizablePanel>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
