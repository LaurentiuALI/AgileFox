import PracticeTabs from "./PracticeTabs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full h-full flex">
      <PracticeTabs projectId={id} />
    </div>
  );
}
