"use client";
import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { IconNodeType } from "./types";

import { ChangeNodeDialog } from "./ChangeNodeDialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash } from "lucide-react";
import State from "@/../public/essence/State.svg";
import { NodeCard } from "./NodeCard";

interface IconNodeProps extends NodeProps {
  data: IconNodeType & {
    onNodeLabelChange?: (id: string, newLabel: string) => void;
    onNodeDelete?: (id: string) => void;
  };
  selected: boolean;
}

export default function StateNode({ id, data, selected }: IconNodeProps) {
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
        <div className="border-4 border-white rounded-xl p-4 px-10">
          <span className="font-bold">{data.label}</span>
        </div>
      ) : (
        <NodeCard nodeData={{ ...data, id }} icon={State} />
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
