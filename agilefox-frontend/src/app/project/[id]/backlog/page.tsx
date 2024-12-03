import BacklogItemTable from "@/components/molecules/backlogItemTable";
export default async function Backlog({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full h-full">
      <BacklogItemTable projectId={id} />
    </div>
  );
}
