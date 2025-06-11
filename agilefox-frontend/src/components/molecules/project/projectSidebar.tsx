"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProjectSidebar({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  const pathname = usePathname();

  // Define navigation items
  const navItems = [
    { href: `/project/${id}/backlog`, label: "Product Backlog" },
    { href: `/project/${id}/refining`, label: "Refining Center" },
    { href: `/project/${id}/planning`, label: "Planning event" },
    { href: `/project/${id}/daily`, label: "Daily Scrum" },
    { href: `/project/${id}/review`, label: "Review Event" },
    { href: `/project/${id}/agilestudio`, label: "Agile Studio" },
    // Add more navigation items as needed
  ];

  return (
    <div
      className={cn(
        "bg-containerBackground h-full flex flex-col gap-4 p-4",
        className
      )}
    >
      <nav className="flex flex-col justify-around h-full">
        {navItems.map((item) => {
          // Check if this route is active
          const isActive = pathname.startsWith(item.href);

          return (
            <Link href={item.href} key={item.href} className="block">
              <Button
                className="w-full h-14 rounded-xl justify-center"
                // Use primary variant for active state, secondary for inactive
                variant={isActive ? "active" : "secondary"}
              >
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
