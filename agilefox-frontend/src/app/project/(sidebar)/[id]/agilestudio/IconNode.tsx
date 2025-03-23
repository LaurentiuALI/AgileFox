"use client";
import React from "react";
import Image from "next/image";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { IconNodeType } from "./types";
interface IconNodeProps extends NodeProps {
  data: IconNodeType;
  onNodeLabelChange?: (id: string, newLabel: string) => void;
  onNodeDelete?: (id: string) => void;
  selected: boolean;
}

export default function IconNode({ id, data, selected }: IconNodeProps) {
  const handleDoubleClick = () => {
    const newLabel = window.prompt("Enter new label", data.label);
    if (newLabel !== null && data.onNodeLabelChange) {
      data.onNodeLabelChange(id, newLabel);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center"
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="source" position={Position.Top} id="top-source" />
      <Handle type="source" position={Position.Bottom} id="top-source" />
      <Handle type="source" position={Position.Left} id="top-source" />
      <Handle type="source" position={Position.Right} id="top-source" />

      {/* Node Content */}
      {data.iconType ? (
        <div>
          <Image
            src={data.IconComponent?.src || ""}
            width={data.IconComponent?.width || 50}
            height={data.IconComponent?.height || 50}
            alt={data.label}
            className="w-24 h-24"
          />

          <span className="text-">{data.label}</span>
        </div>
      ) : (
        <div className="p-2 bg-white border rounded">{data.label}</div>
      )}

      {/* Show delete button when node is selected */}
      {selected && data.onNodeDelete && (
        <button
          className="absolute -top-4 -right-4 bg-red-500 text-white text-xs rounded-full p-1 w-6 h-6 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Do you want to delete this node?")) {
              data.onNodeDelete?.(id);
            }
          }}
        >
          🗑
        </button>
      )}
    </div>
  );
}
