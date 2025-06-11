import { Node as FlowNode, Edge as FlowEdge } from "@xyflow/react";

// interface Position {
//   x: number;
//   y: number;
// }

// interface IconComponent {
//   src: string;
//   width: number;
//   height: number;
//   blurDataURL?: string | null;
//   blurWidth: number;
//   blurHeight: number;
// }

// interface NodeData {
//   [key: string]: unknown;
//   label: string;
//   iconinterface: string;
//   IconComponent?: IconComponent;
// }

// interface Measured {
//   width: number;
//   height: number;
// }

// export interface Node extends FlowNode {
//   id: string;
//   position: Position;
//   type: string;
//   data: NodeData;
//   measured: Measured;
//   selected?: boolean;
//   dragging?: boolean;
// }

// export interface Edge extends FlowEdge {
//   source: string;
//   sourceHandle: string;
//   target: string;
//   targetHandle: string;
//   id: string;
//   selected?: boolean;
//   label?: string | null;
// }

export interface Practice {
  id: string;
  projectId?: number;
  title: string;
  nodes?: FlowNode[] | null;
  edges?: FlowEdge[] | null;
}
