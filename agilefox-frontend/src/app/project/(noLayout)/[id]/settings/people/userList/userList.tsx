"use client";

import { useGetUsersOfProject } from "@/data/project/useProject";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default function UserList({ projectId }: { projectId: number }) {
  const { data, isLoading, isError } = useGetUsersOfProject({ projectId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
