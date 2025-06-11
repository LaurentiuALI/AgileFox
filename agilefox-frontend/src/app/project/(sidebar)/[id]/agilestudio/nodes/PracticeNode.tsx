"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { IconNodeType } from "./types";
interface IconNodeProps extends NodeProps {
  data: IconNodeType & {
    onNodeLabelChange?: (id: string, newLabel: string) => void;
    onNodeDelete?: (id: string) => void;
  };
  selected: boolean;
}

import Practice from "@/../public/essence/Practice.svg";
import { ChangeNodeDialog } from "./ChangeNodeDialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash } from "lucide-react";
import { NodeCard } from "./NodeCard";

export default function PracticeNode({ id, data, selected }: IconNodeProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDoubleClick = () => {
    setOpenDialog(true);
  };

  return (
    <div
      className="relative flex flex-col items-center group"
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="source" position={Position.Top} id="top-source" className="invisible group-hover:visible" />
      <Handle type="source" position={Position.Bottom} id="bottom-source" className="invisible group-hover:visible" />
      <Handle type="source" position={Position.Left} id="left-source" className="invisible group-hover:visible" />
      <Handle type="source" position={Position.Right} id="right-source" className="invisible group-hover:visible" />
      {data.shorten ? (
        <div>
          <Image
            src={Practice}
            width={data.IconComponent?.width}
            height={data.IconComponent?.height}
            alt={data.label}
            className="w-24 h-24"
          />
          <span className="font-bold break-words w-32">{data.label}</span>
        </div>
      ) : (
        <NodeCard nodeData={{ ...data, id }} icon={Practice} />
      )}
      {selected && (
        <div>
          <Button
            className="rounded-full h-8 w-8 bg-red-500 hover:bg-red-600 absolute -top-12 right-8"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("Do you want to delete this node?")) {
                data.onNodeDelete?.(id);
              }
            }}
          >
            <Trash />
          </Button>
          <Button
            className="rounded-full h-8 w-8 bg-red-500 hover:bg-red-600 absolute -top-4 -right-6"
            onClick={() => data.toggleShorten(id)}
          >
            <RefreshCw />
          </Button>
        </div>
      )}
      <ChangeNodeDialog
        current={openDialog}
        setOpenDialog={setOpenDialog}
        data={{ ...data, id }}
      />
    </div>
  );
}
