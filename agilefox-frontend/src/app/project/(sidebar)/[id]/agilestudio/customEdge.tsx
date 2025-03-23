"use client";
import React from "react";
import { getBezierPath, EdgeProps } from "@xyflow/react";
import { Recycle, RecycleIcon, Trash } from "lucide-react";

interface CustomEdgeProps extends EdgeProps {
  label?: string;
  data?: {
    onEdgeLabelChange?: (id: string, newLabel: string) => void;
    onEdgeDelete?: (id: string) => void;
    [key: string]: any;
  };
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  markerEnd,
  data,
  selected, // Provided by React Flow when the edge is selected
}: CustomEdgeProps) {
  // Compute the edge path and the midpoint for the label.
  const edgePath = getBezierPath({ sourceX, sourceY, targetX, targetY });
  const labelX = (sourceX + targetX) / 2;
  const labelY = (sourceY + targetY) / 2;

  // Position for the recycle bin icon (adjust offset as needed)
  const deleteIconX = labelX + 20;
  const deleteIconY = labelY - 20;

  // Handle double-click to update the label.
  const handleDoubleClick = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const newLabel = window.prompt("Enter new label", label);
    if (newLabel !== null && data?.onEdgeLabelChange) {
      data.onEdgeLabelChange(id, newLabel);
    }
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        stroke="#222"
        strokeWidth={2}
        markerEnd={markerEnd}
        onDoubleClick={handleDoubleClick}
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        style={{ fill: "#FFF", fontSize: 12 }}
      >
        {label}
      </text>
      {/* Show delete icon if the edge is selected */}
      {selected && data?.onEdgeDelete && (
        <foreignObject
          x={deleteIconX}
          y={deleteIconY}
          width={24}
          height={24}
          style={{ overflow: "visible", cursor: "pointer" }}
          onClick={(e) => {
            // Prevent the click from affecting the edge selection state.
            e.stopPropagation();
            if (window.confirm("Do you want to delete this edge?")) {
              data.onEdgeDelete(id);
            }
          }}
        >
          {/* Replace this with your actual recycle bin icon */}
          <Trash size={24} />
        </foreignObject>
      )}
    </>
  );
}
