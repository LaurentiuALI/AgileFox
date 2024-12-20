"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BacklogToolbar() {
  const pathname = usePathname();
  const match = pathname?.match(/^\/project\/(\d)\/backlog/);
  const projectId = match ? match[1] : null;
  console.log("s-a randat", projectId);

  if (pathname.includes("backlog")) {
    return (
      <div className="w-12 h-12 flex justify-between p-4">
        <Link href={`/project/${projectId}/backlog/add`}>
          <Button>Add Task for {projectId}</Button>
        </Link>
      </div>
    );
  }
}
