"use client";
import { usePathname } from "next/navigation";
import AddButton from "../ui/add-button";
import Link from "next/link";

export default function BacklogToolbar() {
  const pathname = usePathname();
  const match = pathname?.match(/^\/project\/(\d)\/backlog/);
  const projectId = match ? match[1] : null;

  if (pathname.includes("backlog")) {
    return (
      <div className="w-full h-full flex items-center justify-between p-4">
        <Link href={`/project/${projectId}/backlog/add`}>
          <AddButton ariaLabel="Add New Task" />
        </Link>
      </div>
    );
  }
}
