"use client";
import { CheckItem } from "@/types/CheckItem";
import { tickCheckItem } from "@/util/actions/backlog/card/checkItem/post-tick-checkItem";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export default function CheckItemComponent({
  checkItem,
}: {
  checkItem: CheckItem;
}) {
  const [open, setOpen] = useState(checkItem.checked);
  return (
    <div key={checkItem.id} className="flex gap-4 justify-start items-center">
      <Input
        type="checkbox"
        checked={open}
        className="max-w-4 max-h-4"
        onChange={() => {
          tickCheckItem({ checkItemId: checkItem.id });
          setOpen(!open);
        }}
      />
      <Label className="text-lg text-white">{checkItem.information}</Label>
    </div>
  );
}
