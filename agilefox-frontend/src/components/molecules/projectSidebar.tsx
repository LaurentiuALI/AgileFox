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
      <Link href={`/project/${id}/backlog`}>
        <Button className="w-full h-12" variant="secondary">
          Product Backlog
        </Button>
      </Link>
    </div>
  );
}
