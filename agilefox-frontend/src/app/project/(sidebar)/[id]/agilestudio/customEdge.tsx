"use client";
import React, { ReactNode } from "react";
import { getBezierPath, EdgeProps, useInternalNode, Position } from "@xyflow/react";
import { Node as FlowNode } from "@xyflow/react";

import { Trash } from "lucide-react";
import { getEdgeParams } from "./edgeUtils";

interface CustomEdgeProps extends EdgeProps {
  label?: ReactNode; // Allow ReactNode instead of just string
  data?: {
    onEdgeLabelChange?: (id: string, newLabel: string) => void;
    onEdgeDelete?: (id: string) => void;
    [key: string]: unknown;
  };
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  label,
  markerEnd,
  data,
  selected, // Provided by React Flow when the edge is selected
}) => {
  const sourceNode = useInternalNode<FlowNode>(source);
  const targetNode = useInternalNode<FlowNode>(target);

  if (!sourceNode || !targetNode) {
    return null;
  }
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );


  // Compute the edge path and the midpoint for the label.
  const [edgePath] = getBezierPath({
    sourceX: sx as number,
    sourceY: sy as number,
    sourcePosition: sourcePos as Position,
    targetPosition: targetPos as Position,
    targetX: tx as number,
    targetY: ty as number,
  });
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
    const newLabel = window.prompt("Enter new label", label as string);
    if (newLabel !== null && data?.onEdgeLabelChange) {
      data.onEdgeLabelChange(id, newLabel);
    }
  };

  return (
    <g className={`custom-edge ${selected ? "selected" : ""}`}>
      <path
        id={id}
        className="react-flow__edge-path bg-red-500 "
        d={edgePath}
        stroke="#222"
        markerEnd={markerEnd}
        onDoubleClick={handleDoubleClick}
      />
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          style={{ fill: "#FFF", fontSize: 12 }}

        >
          <tspan onDoubleClick={(event) => {
            event.stopPropagation();
            const newLabel = window.prompt("Enter new label", label as string);
            if (newLabel !== null && data?.onEdgeLabelChange) {
              data.onEdgeLabelChange(id, newLabel);
            }
          }}>
            {label}
          </tspan>
        </text>
      )}
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
              data.onEdgeDelete?.(id);
            }
          }}
        >
          <Trash size={24} />
        </foreignObject>
      )}
    </g>
  );
};

export default CustomEdge;
