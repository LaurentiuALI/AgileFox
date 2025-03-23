"use client";
import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
  ConnectionMode,
  Connection,
  XYPosition,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import IconNode from "./IconNode";
import Sidebar from "./sidebar";
import CustomEdge from "./customEdge";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Practice } from "@/types/agilestudio/practiceTypes";
import { patchPractice } from "@/util/actions/agilestudio/patch-practice";
import { Button } from "@/components/ui/button";

// --- Types ---
interface NodeData {
  label: string;
  iconType: string;
  IconComponent?: React.ComponentType;
  onNodeLabelChange?: (nodeId: string, newLabel: string) => void;
  onNodeDelete?: (nodeId: string) => void;
}

interface EdgeData {
  onEdgeLabelChange?: (edgeId: string, newLabel: string) => void;
  onEdgeDelete?: (edgeId: string) => void;
}

interface FlowContentProps {
  practice: Practice;
}

// --- FlowContent: Uses the ReactFlow hook inside a provider context ---
function FlowContent({ practice }: FlowContentProps) {
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeData>([]);
  const initialCoordsRef = useRef<XYPosition>({ x: 0, y: 0 });

  // Use a state flag to track whether the saved data has been loaded
  const [hasLoaded, setHasLoaded] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setNodes(practice.nodes || []);
    setEdges(practice.edges || []);
    setHasLoaded(true);
  }, [practice.nodes, practice.edges, setNodes, setEdges]);

  const handleSaving = () => {
    if (!hasLoaded) return;
    setIsSaving(true);

    patchPractice({
      id: practice.id,
      projectId: practice.projectId,
      title: practice.title,
      nodes: nodes,
      edges: edges,
    });
    setIsSaving(false);
  };
  // Save state to localStorage whenever nodes or edges change, but only after load

  const handleConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Register custom node types
  const nodeTypes = useMemo(() => ({ iconNode: IconNode }), []);

  const updateNodeLabel = useCallback(
    (nodeId: string, newLabel: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [setNodes]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  // Edge callbacks
  const updateEdgeLabel = useCallback(
    (edgeId: string, newLabel: string) => {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === edgeId ? { ...edge, label: newLabel } : edge
        )
      );
    },
    [setEdges]
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  // Process nodes and edges to include callbacks
  const processedNodes = useMemo(() => {
    console.log("Processing nodes:", nodes);

    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onNodeLabelChange: updateNodeLabel,
        onNodeDelete: removeNode,
      },
    }));
  }, [nodes, updateNodeLabel, removeNode]);

  const processedEdges = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        type: "custom",
        data: {
          ...edge.data,
          onEdgeLabelChange: updateEdgeLabel,
          onEdgeDelete: removeEdge,
        },
      })),
    [edges, updateEdgeLabel, removeEdge]
  );

  // DnD callbacks
  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (event.activatorEvent instanceof MouseEvent) {
      initialCoordsRef.current = {
        x: event.activatorEvent.clientX,
        y: event.activatorEvent.clientY,
      };
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      try {
        const dragData = event.active.data.current as {
          iconType: string;
          label: string;
          IconComponent?: React.ComponentType;
        };
        if (!dragData) return;
        const finalX = initialCoordsRef.current.x + (event.delta?.x || 0);
        const finalY = initialCoordsRef.current.y + (event.delta?.y || 0);
        const dropPosition = screenToFlowPosition({ x: finalX, y: finalY });
        const newId = `node-${nodes.length + 1}`;
        const newNode = {
          id: newId,
          position: dropPosition,
          type: "iconNode",
          data: {
            label: dragData.label || "New Node",
            iconType: dragData.iconType,
            IconComponent: dragData.IconComponent,
          },
        };
        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.error("Error handling drag end:", error);
      }
    },
    [screenToFlowPosition, nodes, setNodes]
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="relative w-full h-full flex">
        <Button onClick={handleSaving} className="absolute z-10">
          Save
          {isSaving && (
            <div className="animate-spin rounded-full size-5 border-4 border-white border-t-transparent" />
          )}
        </Button>
        <ReactFlow
          id={practice.id}
          nodeTypes={nodeTypes}
          nodes={processedNodes}
          edges={processedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          connectionMode={ConnectionMode.Loose}
          onConnect={handleConnect}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          edgeTypes={{ custom: CustomEdge }}
        >
          <Controls className="text-black" />
          <MiniMap
            maskColor="rgba(0,0,0,1)"
            pannable
            zoomable
            nodeColor="black"
          />
          <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
        </ReactFlow>
        <Sidebar />
      </div>
    </DndContext>
  );
}

// --- FlowContainer: Wraps FlowContent with its own provider ---
export default function FlowContainer({ practice }: { practice: Practice }) {
  return (
    <ReactFlowProvider key={practice.id}>
      <FlowContent practice={practice} />
    </ReactFlowProvider>
  );
}
