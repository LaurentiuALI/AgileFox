import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

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
            <Link href={`/project/${id}/settings/people `}>
              <Button className="w-full h-12" variant="secondary">
                People
              </Button>
            </Link>
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-transparent hover:bg-secondary" />
        <ResizablePanel>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
