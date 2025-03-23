export default async function Project({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return <></>;
}
