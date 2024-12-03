"use client";

import { MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function ProjectDrawer({
  className,
  id,
}: {
  className?: string;
  id: number;
}) {
  const isWindow = useMediaQuery("(max-width: 1024px)");
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    isWindow && (
      <div className={`${className}`}>
        <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="p-0"
              onClick={() => setIsOpen(true)}
            >
              <MenuIcon />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Project Menu</DrawerTitle>
            </DrawerHeader>

            <div className="grid gap-4 p-4">
              <Button className="w-full" onClick={handleClose}>
                <Link href={`/project/${id}/backlog`}>Product Backlog</Link>
              </Button>
              <Button className="w-full" onClick={handleClose}>
                <Link href={`/project/${id}/backlog`}>Tasks</Link>
              </Button>
              <Button className="w-full" onClick={handleClose}>
                <Link href={`/project/${id}/backlog`}>Settings</Link>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    )
  );
}
