"use client";

import AsigneeSelector from "@/components/molecules/backlog/AsigneeSelector";
import ProgressState from "@/components/molecules/backlog/progress";
import { BacklogItem } from "@/types/BacklogItem";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BacklogItem>[] = [
  {
    accessorKey: "uid",
    header: "UID",
    size: 100
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 300
  },
  {
    accessorKey: "type.name",
    header: "Type",
    size: 100,
  },
  {
    accessorKey: "username",
    header: "Assigned to",
    size: 200,
    cell: (props) => (
      <AsigneeSelector value={props.getValue() as string} backlogItemId={props.row.original.id} projectId={props.row.original.projectId} />
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress to next state",
    cell: (props) => <ProgressState backlogItemId={props.row.original.id} actualScore={props.row.original.actualScore} totalScore={props.row.original.totalScore} />,
  },
];
