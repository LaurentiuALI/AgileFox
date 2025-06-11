"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";

import { IconComponentType, icons } from "./nodes/types";
import Image from "next/image";
// A reusable component for a draggable icon.
function DraggableIcon({
  id,
  IconComponent,
  iconType,
  label,
}: {
  id: string;
  IconComponent: IconComponentType;
  iconType: string;
  label: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { iconType, label, IconComponent },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grabbing"
    >
      <Image src={IconComponent} alt={label} className="w-12 h-12 md:w-8 md:h-8" />
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="absolute top-12 h-[250px] w-[100px]">
      <div className="bg-neutral-500 h-full w-full flex flex-col gap-4 items-center justify-center rounded-xl">
        {
          icons.map((icon) => (
            <DraggableIcon key={icon.id} {...icon} />
          ))
        }
      </div >
    </div >
  );
}
