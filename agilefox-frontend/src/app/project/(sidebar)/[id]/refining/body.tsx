"use client";

import { columns } from "@/components/molecules/refining/columns";
import { DataTable } from "@/components/molecules/refining/data-table";
import DataTableSkeleton from "@/components/molecules/refining/dataTableSkeleton";
import { useGetBacklogItems } from "@/data/backlog/backlogItem/useBacklogItem";
import {  BacklogItemSchema } from "@/types/BacklogItem";

export default function Body({ id }: { id: number }) {
  const {
    data: backlogItems,
    isLoading,
    isError,
  } = useGetBacklogItems({
    projectId: id,
  });

  if (isError || !backlogItems) {
    return <div>Error loading backlog items</div>;
  }
  if (isLoading) {
    return <DataTableSkeleton />;
  }

  const parsedBacklogItems = BacklogItemSchema.array().parse(backlogItems);

  return (
    <div className="w-full h-full">
      <DataTable data={parsedBacklogItems} columns={columns} />
    </div>
  );
}
