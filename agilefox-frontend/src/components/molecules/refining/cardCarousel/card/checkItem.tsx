"use client";
import { CheckItem } from "@/types/CheckItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card } from "@/types/Card";
import { useTickCheckItem } from "@/data/card/checkitem/useCheckItem";

export default function CheckItemComponent({
  checkItem,
  card
}: {
  checkItem: CheckItem;
  card: Card;
}) {

  const mutation = useTickCheckItem();
  const [open, setOpen] = useState(checkItem.checked);
  return (
    <div key={checkItem.id} className="flex gap-4 justify-start items-center">
      <Input
        type="checkbox"
        checked={open}
        className="max-w-4 max-h-4"
        onChange={() => {
          mutation.mutate({ checkItemId: checkItem.id, projectId: card.projectId, backlogItemId: card.backlogItem?.id as number });
          setOpen(!open);
        }}
      />
      <Label className="text-lg text-white">{checkItem.information}</Label>
    </div>
  );
}
