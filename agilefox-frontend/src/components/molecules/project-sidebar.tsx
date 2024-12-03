import { Button } from "@/components/ui/button";
import Link from "next/link";
export async function ProjectSidebar({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  return (
    <div
      className={`bg-containerBackground h-full flex flex-col justify-between p-4 ${className}`}
    >
      <Button className="w-full" variant="secondary">
        <Link href={`/project/${id}/backlog`}>Product Backlog</Link>
      </Button>
    </div>
  );
}
