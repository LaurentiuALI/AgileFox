import { ProjectSidebar } from "@/components/molecules/project-sidebar";
import { ProjectDrawer } from "@/components/molecules/projectDrawer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@/hooks/use-media-query";

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
          <ProjectSidebar id={id} />
        </ResizablePanel>
        <ResizableHandle className="bg-transparent hover:bg-secondary" />
        <ResizablePanel>{children}</ResizablePanel>
      </ResizablePanelGroup>
      <ProjectDrawer
        className="lg:invisible absolute top-0 right-0 m-6"
        id={id}
      />
    </div>
  );
}
