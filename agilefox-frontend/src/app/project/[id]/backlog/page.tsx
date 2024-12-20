import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllBacklogItems } from "@/util/actions/backlog/backlogItem/get-all-backlogItems";
export default async function Backlog({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const backlogItems = await getAllBacklogItems({ projectId: id });
  return (
    <div className="w-full h-full">
      <DataTable columns={columns} data={backlogItems} />
    </div>
  );
}
