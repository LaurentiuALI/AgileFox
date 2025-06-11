"use client";

import { BacklogItem } from "@/types/BacklogItem";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { State } from "@/types/State";
import ProgressState from "../backlog/progress";
import DeleteDropdown from "./DeleteDropdown";

export const columns: ColumnDef<BacklogItem>[] = [
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
    size: 15,
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
    cell: (props) => <ProgressState backlogItemId={props.row.original.id} actualScore={props.row.original.actualScore} totalScore={props.row.original.totalScore} />,
  },
  {
    id: "state",
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      return row.original.state.name;
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStates) => {
      if (filterStates.length === 0) return true;
      const state = row.getValue(columnId);
      return filterStates.includes((state as State)?.name);
    },
  },
  {
    id: "type",
    accessorKey: "type.name",
    header: "Type",
  },
  {
    id: "actions",
    size: 5,
    cell: ({ row }) => {
      return (
        <DeleteDropdown
          backlogItemId={row.original.id}
          projectId={row.original.projectId} />
      );
    },
  },
];
