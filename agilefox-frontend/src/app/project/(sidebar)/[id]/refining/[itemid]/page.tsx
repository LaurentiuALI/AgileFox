import ContentDesktop from "./contentDesktop";

export default async function Backlog({
  params,
}: {
  params: Promise<{ id: number; itemid: number }>;
}) {
  const { id, itemid } = await params;


  return (
    <div className="h-full">
      {/* <ContentMobile backlogItem={backlogItem} /> */}
      <ContentDesktop backlogItemId={itemid} projectId={id} />

    </div>
  );
}
