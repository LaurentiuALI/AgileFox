import BacklogItemTable from "@/components/backlogItemTable";
export default async function Projects({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div>
      
      <BacklogItemTable projectId={id} />
    </div>
  );
}
