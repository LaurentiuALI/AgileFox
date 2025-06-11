"use client";
import { usePathname } from "next/navigation";
import { AddBacklogItemDialog } from "./backlog/AddBacklogItemDialog";

export default function BacklogToolbar() {
  const pathname = usePathname();
  const match = pathname?.match(/^\/project\/(\d+)\//);

  const projectId = match ? match[1] : null;

  if (pathname.includes("backlog") || pathname.includes("refining")) {
    return (
      <div className="w-full h-full flex items-center justify-between p-4">
        <AddBacklogItemDialog projectId={Number(projectId)} />
      </div>
    );
  }
}
