import { BacklogItemForm } from "@/components/molecules/backlog/backlogItemForm";

export default async function Add({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="flex justify-center mt-2 h-full w-full">
      <BacklogItemForm projectId={id} />
    </div>
  );
}
