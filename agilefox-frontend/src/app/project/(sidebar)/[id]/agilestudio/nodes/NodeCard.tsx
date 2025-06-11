import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconNodeType } from "./types";
import Image from "next/image";
import { useNodeConnections, useNodesData } from "@xyflow/react";

interface NodeCardProps {
  nodeData: IconNodeType & {
    id: string;

  };
  icon?: string;
}

interface Node {
  data: IconNodeType;
  id: string;
  type: string;
}

export function NodeCard({ nodeData, icon }: NodeCardProps) {

  const siblingRelationMap = new Map<React.ReactNode, Node[]>();
  const parentRelationMap = new Map<React.ReactNode, Node[]>();

  const parentConnections = useNodeConnections({
    id: nodeData.id,
    handleType: "target",
  });

  const parentNodes = useNodesData([
    ...parentConnections.map((conn) => conn.source),
  ]) as Node[];

  const parentEdges = nodeData.getParentEdges(nodeData.id);

  parentNodes.forEach((node) => {
    parentEdges.forEach((edge) => {
      if (node.id == edge.source) {
        const label = edge.label;
        if (parentRelationMap.has(label)) {
          parentRelationMap.get(label)?.push(node);
        } else {
          parentRelationMap.set(label, [node]);
        }
      }
    })
  });

  const siblingConnections = useNodeConnections({
    id: nodeData.id,
    handleType: "source",
  });

  const siblingsNodes = useNodesData([
    ...siblingConnections.map((conn) => conn.target),
  ]) as Node[];

  const siblingEdges = nodeData.getSiblingEdges(nodeData.id);

  siblingsNodes.forEach((node) => {
    siblingEdges.forEach((edge) => {
      if (node.id == edge.target) {
        const label = edge.label;
        if (siblingRelationMap.has(label)) {
          siblingRelationMap.get(label)?.push(node);
        } else {
          siblingRelationMap.set(label, [node]);
        }
      }
    })
  });





  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-col items-center">
        <div className="flex flex-col ml-4">
          <CardTitle className="flex justify-between gap-4 h-full">
            <div>
              <Image
                src={icon as string}
                width={nodeData.IconComponent?.width}
                height={nodeData.IconComponent?.height}
                alt={nodeData.label}
                className="w-8 h-8"
              />
              {nodeData.label}
            </div>


          </CardTitle>

          <CardDescription>{nodeData.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {parentNodes.length > 0 && Array.from(parentRelationMap.entries()).map(([label, nodes]) => (
          <div key={String(label)}>
            <span className="font-bold">{label ? label : "Produced by: "}</span>
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center gap-2 w-full h-full">
                <Image
                  src={node.data.IconComponent?.src as string}
                  width={node.data.IconComponent?.width}
                  height={node.data.IconComponent?.height}
                  alt={node.data.label}
                  className="w-8 h-8"
                />
                {node.data.label}
              </div>
            ))}
          </div>
        ))}
        {Array.from(siblingRelationMap.entries()).map(([label, nodes]) => (
          <div key={String(label)}>
            <span className="font-bold">{label ? label : "Produces: "}</span>
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center gap-2 w-full h-full">
                <Image
                  src={node.data.IconComponent?.src as string}
                  width={node.data.IconComponent?.width}
                  height={node.data.IconComponent?.height}
                  alt={node.data.label}
                  className="w-8 h-8"
                />
                {node.data.label}
              </div>
            ))}
          </div>
        ))}

      </CardContent>
    </Card >
  );
}