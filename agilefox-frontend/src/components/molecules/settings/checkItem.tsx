"use client";
import { CheckItem } from "@/types/CheckItem";
import { Label } from "@/components/ui/label";

export default function CheckItemComponent({
  checkItem,
}: {
  checkItem: CheckItem;
}) {
  return (
    <div key={checkItem.id} className="flex gap-4 justify-start">
      <Label className="text-lg text-white">{checkItem.information}</Label>
    </div>
  );
}
