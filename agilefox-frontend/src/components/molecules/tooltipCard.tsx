"use client";
import { Info } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

export function TooltipCard({ tooltipText }: { tooltipText: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent>
        <p>{tooltipText}</p>
      </PopoverContent>
    </Popover>
  );
}
