import Body from "./body";

export default async function Refining({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  if (!id) throw new Error("Query parameter missing");
  if (Array.isArray(id))
    throw new Error("Query parameter shouldn't be an array");

  return <Body id={id} />
}
