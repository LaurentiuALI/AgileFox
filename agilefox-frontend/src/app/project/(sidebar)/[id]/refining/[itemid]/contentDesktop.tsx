"use client";
import BacklogItemDetails from "@/components/molecules/refining/backlogItemDetails";
import CardCarouselDesktop from "@/components/molecules/refining/cardCarousel/cardCarouselDesktop";
import EditableBand from "@/components/molecules/refining/cardCarousel/editableBand";
import { useGetBacklogItem } from "@/data/backlog/backlogItem/useBacklogItem";

export default function ContentDesktop({
  backlogItemId,
  projectId,
}: {
  backlogItemId: number;
  projectId: number;
}) {


  const { data: backlogItem, isError } = useGetBacklogItem({
    projectId: projectId,
    backlogItemId: backlogItemId,
  });
  if (isError) return <div>Error...</div>;

  if (backlogItem)
    return (
      <div className="w-full h-full sm:hidden md:hidden lg:block p-4">
        <div className="flex h-1/2 ">
          <div className="w-[60%] ">
            <EditableBand
              initialValue={backlogItem.title}
              id={backlogItem.id}
              field="title"
              className="font-semibold text-2xl text-white mb-4"
            />
            <div className="gap-2">
              <h2 className="text-2xl text-neutral-500 mb-2">Description</h2>
              <EditableBand
                initialValue={backlogItem.description}
                id={backlogItem.id}
                field="description"
                className="text-lg text-white mb-4"
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <BacklogItemDetails backlogItem={backlogItem} />
          </div>
        </div>
        <CardCarouselDesktop
          projectId={backlogItem.projectId}
          backlogItem={backlogItem}
        />
      </div>
    );
}
