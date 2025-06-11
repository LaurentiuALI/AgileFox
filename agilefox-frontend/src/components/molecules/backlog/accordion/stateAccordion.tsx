"use client";
import { useGetBacklogItems } from "@/data/backlog/backlogItem/useBacklogItem";
import StateBacklogDataTable from "./StateBacklogDataTable";
import { columns } from "./columns";
import { useGetProjectState } from "@/data/backlog/state/useState";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


export default function StateAccordion({ projectId }: { projectId: number }) {
  const {
    data: backlogItems,
    isError,
    isLoading,
  } = useGetBacklogItems({
    projectId: projectId,
  });
  const { data: projectState } =
    useGetProjectState({
      projectId: projectId,
    });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading backlog items</div>;
  }

  if (!backlogItems || backlogItems.length === 0) {
    return <div className="w-[50vw] h-[50vh] bg-neutral-800 rounded-2xl flex justify-center items-center">No backlog items found</div>;
  }

  return (
    <ScrollArea className="w-full h-[90%] whitespace-nowrap rounded-md ">
      <div className="h-full p-4 flex gap-8">
        {[...new Map(
          projectState
            ?.sort((a, b) => a.stateOrder - b.stateOrder)
            .map((state) => [state.name, state])
        ).values()]
          .map((state) => (
            <div key={state.id} className="w-full h-full bg-neutral-800 rounded-2xl ">
              <div className="font-bold bg-neutral-900 flex justify-center p-2 rounded-t-2xl">
                {state.name}
              </div>
              <ScrollArea className="w-full h-[70vh] px-2">
                <StateBacklogDataTable
                  data={backlogItems.filter(
                    (backlogItem) => backlogItem.state.name == state.name
                  )}
                  columns={columns}
                />
              </ScrollArea>
            </div>
          ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
