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
  type Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { v4 as uuidv4 } from "uuid";

import Sidebar from "./sidebar";
import CustomEdge from "./customEdge";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Practice } from "@/types/agilestudio/practiceTypes";
import { patchPractice } from "@/util/actions/agilestudio/patch-practice";
import { Button } from "@/components/ui/button";
import PracticeNode from "./nodes/PracticeNode";
import ActivityNode from "./nodes/ActivityNode";
import WorkProductNode from "./nodes/WorkProductNode";
import AlphaNode from "./nodes/AlphaNode";
import { AddNodeDialog } from "./AddNodeDialog";
import StateNode from "./nodes/StateNode";
import RoleGuard from "@/components/molecules/RoleGuard";
import { useSession } from "next-auth/react";

interface FlowContentProps {
  practice: Practice;
}

function FlowContent({ practice }: FlowContentProps) {

  const { data } = useSession();


  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const initialCoordsRef = useRef<XYPosition>({ x: 0, y: 0 });
  const [newNodeData, setNewNodeData] = useState<Node>();

  const [openDialog, setOpenDialog] = useState(false);

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

  const toggleShortenCards = () => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, shorten: !node.data.shorten },
      }))
    );
  };

  const handleConnect = useCallback(
    (params: Connection) =>
      setEdges((eds: Edge[]) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      ),
    [setEdges]
  );

  const getSiblingEdges = useCallback(
    (nodeId: string) => {
      const node = nodes.find((node) => node.id === nodeId);
      if (!node) return [];

      const siblingEdges = edges.filter(
        (edge) =>
          edge.source === nodeId
      );

      return siblingEdges;
    },
    [nodes, edges]
  );

  const getParentEdges = useCallback(
    (nodeId: string) => {
      const node = nodes.find((node) => node.id === nodeId);
      if (!node) return [];

      const siblingEdges = edges.filter(
        (edge) =>
          edge.target === nodeId
      );

      return siblingEdges;
    },
    [nodes, edges]
  );

  const nodeTypes = useMemo(
    () => ({
      PracticeNode,
      ActivityNode,
      WorkProductNode,
      AlphaNode,
      StateNode,
    }),
    []
  );

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

  const updateNodeDescription = useCallback(
    (nodeId: string, newDescription: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          return node.id === nodeId
            ? { ...node, data: { ...node.data, description: newDescription } }
            : node
        }
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

  const toggleShorten = useCallback(
    (nodeId: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, shorten: !node.data.shorten } }
            : node
        )
      );
    },
    [setNodes]
  );

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

  const processedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onNodeLabelChange: updateNodeLabel,
        onNodeDescriptionChange: updateNodeDescription,
        onNodeDelete: removeNode,
        getSiblingEdges: getSiblingEdges,
        getParentEdges: getParentEdges,
        toggleShorten: toggleShorten
      },
    }));
  }, [nodes, updateNodeLabel, removeNode, edges]);

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
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 40,
          height: 40,
          color: "orange",
        },
      })),
    [edges, updateEdgeLabel, removeEdge]
  );

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

        setOpenDialog(true);
        const finalX = initialCoordsRef.current.x + (event.delta?.x || 0);
        const finalY = initialCoordsRef.current.y + (event.delta?.y || 0);
        const dropPosition = screenToFlowPosition({ x: finalX, y: finalY });
        const newId = `node-${uuidv4()}`;
        const newNode = {
          id: newId,
          position: dropPosition,
          type: `${dragData.iconType}`,
          data: {
            label: dragData.label || "New Node",
            iconType: dragData.iconType,
            IconComponent: dragData.IconComponent,
            description: "Description",
            shorten: false
          },
        };
        setNewNodeData(newNode);
      } catch (error) {
        console.error("Error handling drag end:", error);
      }
    },
    [screenToFlowPosition]
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
      <div className="relative w-full h-full flex ">
        <RoleGuard roles={data?.user.roles} allowed={["scrum master"]}>
          <Button onClick={handleSaving} className="absolute z-10">
            Save
            {isSaving && (
              <div className="animate-spin rounded-full size-5 border-4 border-white border-t-transparent" />
            )}
          </Button>
        </RoleGuard>

        <Button onClick={toggleShortenCards} className="absolute left-20 z-10">
          Toggle shorten cards
        </Button>
        <ReactFlow
          id={practice.id}
          nodeTypes={nodeTypes}
          nodes={processedNodes}
          edgeTypes={{ custom: CustomEdge }}
          edges={processedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          connectionMode={ConnectionMode.Loose}
          onConnect={handleConnect}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          panOnScroll
          panOnDrag={[1, 2]}
          selectionOnDrag
        >
          <Controls className="text-black" />
          <MiniMap
            maskColor="rgba(0,0,0,1)"
            pannable
            zoomable
            nodeColor="black"
          />
          <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
          <AddNodeDialog
            current={openDialog}
            setOpenDialog={setOpenDialog}
            setNodes={setNodes}
            newNodeData={newNodeData}
          />
        </ReactFlow>
        <Sidebar />
      </div>
    </DndContext>
  );
}

export default function FlowContainer({ practice }: { practice: Practice }) {
  return (
    <ReactFlowProvider key={practice.id}>
      <FlowContent practice={practice} />
    </ReactFlowProvider>
  );
}
