import { BacklogItem } from "@/types/BacklogItem";
import { Badge } from "../ui/badge";

export default function BacklogItemDetails({
  backlogItem,
}: {
  backlogItem: BacklogItem;
}) {
  return (
    <div className="w-[90%] h-[100%] lg:w-[40%] lg:h-2/3 m-4 bg-neutral-800 rounded-xl border-2 border-blue-500">
      <Badge className="m-4 rounded-xl p-2 bg-neutral-600">
        {backlogItem.state.name}
      </Badge>
      <Badge className="m-4 rounded-xl flex justify-between p-2 bg-neutral-600">
        <span>Assignee</span>
        <span>John Doe</span>
      </Badge>
      <Badge className="m-4 rounded-xl flex justify-between p-2 bg-neutral-600">
        <span>Epic</span>
        <span>Test epic</span>
      </Badge>
      <Badge className="m-4 rounded-xl flex justify-between p-2 bg-neutral-600">
        <span>Story Points</span>
        <span>1</span>
      </Badge>
    </div>
  );
}
