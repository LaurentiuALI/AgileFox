"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBacklogItem } from "@/data/backlog/backlogItem/useBacklogItem";

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
  const mutation = useUpdateBacklogItem();

  function handleChange() {
    mutation.mutate({ id, [`${field}`]: value });
    setIsEditing(false);
  }

  return (
    <div onClick={() => setIsEditing(true)} className="rounded cursor-pointer">
      {isEditing ? (
        field == "title" ? (
          <Input
            type="text"
            className={className}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleChange}
            autoFocus
          />) : (
          <Textarea
            className={className + " h-full"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleChange}
            autoFocus
          />)
      ) : (
        <h1 className={className + "hover:bg-neutral-800 hover:opacity-80"}>
          {value || (field === "title" ? "Insert your ideas here..." : "Insert your ideas here...")}
        </h1>
      )}

    </div>
  );
}
