"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import Practice from "@/../public/essence/Practice.svg";
import Activity from "@/../public/essence/Activity.svg";
import WorkProduct from "@/../public/essence/Work Product.svg";
import Alpha from "@/../public/essence/Alpha.svg";
import Image from "next/image";

// A reusable component for a draggable icon.
function DraggableIcon({ id, IconComponent, iconType, label }) {
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
      className="cursor-move"
    >
      <Image src={IconComponent} alt={label} className="w-16 h-16" />
    </div>
  );
}

export default function Sidebar() {
  // Define a list of draggable icons with their corresponding metadata.
  const icons = [
    {
      id: "draggable-practice",
      IconComponent: Practice,
      iconType: "practice",
      label: "Practice",
    },
    {
      id: "draggable-activity",
      IconComponent: Activity,
      iconType: "activity",
      label: "activity",
    },
    {
      id: "draggable-workproduct",
      IconComponent: WorkProduct,
      iconType: "workproduct",
      label: "workproduct",
    },
    {
      id: "draggable-alpha",
      IconComponent: Alpha,
      iconType: "alpha",
      label: "alpha",
    },
  ];

  return (
    <div className="w-1/6 mr-8 p-4 h-full abso">
      <div className="bg-neutral-500 h-full flex flex-col gap-4 items-center justify-center">
        {icons.map((icon) => (
          <DraggableIcon key={icon.id} {...icon} />
        ))}
      </div>
    </div>
  );
}
