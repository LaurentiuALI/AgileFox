import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Project({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full h-full">
      <div className="grid gap-4 p-4 lg:hidden">
        <Link href={`/project/${id}/backlog`}>
          <Button className="w-full">Product Backlog</Button>
        </Link>
        <Button className="w-full">
          <Link href={`/project/${id}/backlog`}>Tasks</Link>
        </Button>
        <Button className="w-full">
          <Link href={`/project/${id}/backlog`}>Settings</Link>
        </Button>
      </div>
    </div>
  );
}
