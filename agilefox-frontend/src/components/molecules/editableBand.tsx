"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { patchBacklogItem } from "@/util/actions/backlog/backlogItem/patch-backlogItem";

type EditableBandProps = {
  initialValue: string;
  id: number;
  field: "title" | "description"; // Extend this as needed
  className?: string;
};

export default function EditableBand({
  initialValue,
  id,
  field,
  className,
}: EditableBandProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  function handleChange(newValue: string) {
    setValue(newValue);
    patchBacklogItem({ id, [field]: newValue });
  }

  return (
    <div onClick={() => setIsEditing(true)} className="rounded cursor-pointer">
      {isEditing ? (
        <Input
          type="text"
          className={className}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <h1 className={className + "hover:bg-neutral-800 hover:opacity-80"}>
          {value}
        </h1>
      )}
    </div>
  );
}
