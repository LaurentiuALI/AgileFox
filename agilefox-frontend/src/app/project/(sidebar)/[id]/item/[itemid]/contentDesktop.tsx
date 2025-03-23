import BacklogItemDetails from "@/components/molecules/backlogItemDetails";
import CardCarouselDesktop from "@/components/molecules/cardCarouselDesktop";
import EditableBand from "@/components/molecules/editableBand";
import { BacklogItem } from "@/types/BacklogItem";

export default function ContentDesktop({
  backlogItem,
}: {
  backlogItem: BacklogItem;
}) {
  return (
    <div className="w-full h-full sm:hidden md:hidden lg:block">
      <div className="flex h-1/2 border-2 border-green-500">
        <div className="w-[60%] ">
          <h2 className="text-xl text-neutral-500 mb-2">
            Here/should/be/some/crumbreads
          </h2>
          <EditableBand
            initialValue={backlogItem.title}
            id={backlogItem.id}
            field="title"
            className="font-semibold text-2xl text-white border-0 mb-4"
          />
          <div className="gap-2">
            <h2 className="text-2xl text-neutral-500 mb-2">Description</h2>
            <EditableBand
              initialValue={backlogItem.description}
              id={backlogItem.id}
              field="description"
              className="text-lg text-white border-0 mb-4"
            />
          </div>
        </div>
        <BacklogItemDetails backlogItem={backlogItem} />
      </div>
      <CardCarouselDesktop
        projectId={backlogItem.projectId}
        backlogItem={backlogItem}
      />
    </div>
  );
}
