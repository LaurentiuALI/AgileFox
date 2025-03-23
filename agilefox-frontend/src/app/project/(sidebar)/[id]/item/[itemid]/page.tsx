import ContentMobile from "./contentMobile";
import ContentDesktop from "./contentDesktop";
import { getBacklogItems } from "@/util/actions/backlog/backlogItem/get-backlogItem";

export default async function Backlog({
  params,
}: {
  params: Promise<{ id: number; itemid: number }>;
}) {
  const { id, itemid } = await params;

  const backlogItem = await getBacklogItems({
    projectId: id,
    backlogItemId: itemid,
  });

  if (backlogItem !== undefined) {
    return (
      <div className="h-full">
        <ContentMobile backlogItem={backlogItem} />
        <ContentDesktop backlogItem={backlogItem} />
      </div>
    );
  } else {
    return <div>Backlog item not found</div>;
  }
}
