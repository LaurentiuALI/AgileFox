"use client";

import { BacklogItemSchema } from "@/types/BacklogItem";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteBacklogItem } from "@/util/actions/backlog/backlogItem/delete-backlogItem";
import ProgressState from "@/components/molecules/progress";
import AsigneeSelector from "./AsigneeSelector";

export const columns: ColumnDef<typeof BacklogItemSchema>[] = [
  {
    id: "select",
    size: 10,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "progress",
    header: "Progress to next state",
    cell: (props) => <ProgressState id={props.cell.row.original.id} />,
  },
  {
    id: "state",
    accessorKey: "state.name",
    header: "State",
  },
  {
    id: "type",
    accessorKey: "type.name",
    header: "Type",
  },
  {
    accessorKey: "username",
    header: "Assignee",
    cell: ({ row }) => <AsigneeSelector backlogItem={row.original} />,
  },
  {
    id: "actions",
    size: 5,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => deleteBacklogItem(row.original.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
