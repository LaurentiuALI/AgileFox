import { BacklogItem } from "@/types/BacklogItem";
import AsigneeSelector from "./cardCarousel/AsigneeSelector";

export default function BacklogItemDetails({
  backlogItem,
}: {
  backlogItem: BacklogItem;
}) {
  return (
    <div className="w-[25%] h-1/3 m-4 bg-neutral-800 rounded-xl">
      <div className="m-4 rounded-xl p-2 bg-neutral-600 w-max">
        {backlogItem.state.name}
      </div>
      <AsigneeSelector backlogItem={backlogItem} />
    </div>
  );
}
