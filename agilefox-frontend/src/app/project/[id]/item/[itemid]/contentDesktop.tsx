import BacklogItemDetails from "@/components/molecules/backlogItemDetails";
import CardCarouselDesktop from "@/components/molecules/cardCarouselDesktop";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BacklogItem } from "@/types/BacklogItem";
import { getCardByStateId } from "@/util/actions/backlog/card/get-card-by-stateId";

export default async function ContentDesktop({
  backlogItem,
}: {
  backlogItem: BacklogItem;
}) {
  const cards = await getCardByStateId({ stateId: backlogItem?.state.id });
  console.log(
    "🚀 ~ cards:",
    cards?.filter((card) => card.backlogItem?.id === backlogItem?.id)
  );

  return (
    <div className="w-full h-full sm:hidden md:hidden lg:block">
      <div className="flex h-1/2 border-2 border-green-500">
        <div className="w-[60%] ">
          <h2 className="text-xl text-neutral-500 mb-2">
            Here/should/be/some/crumbreads
          </h2>
          <Input
            className="font-semibold text-2xl text-white border-0 mb-4"
            value={backlogItem?.title}
          />
          <div className="gap-2">
            <h2 className="text-2xl text-neutral-500 mb-2">Description</h2>
            <Textarea className="border-0" value={backlogItem?.description} />
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
