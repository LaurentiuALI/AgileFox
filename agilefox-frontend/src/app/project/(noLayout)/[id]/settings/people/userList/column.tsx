"use client";

import { User } from "@/types/User";
import { ColumnDef } from "@tanstack/react-table";

function formatDate(date: string) {
  const currDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return currDate.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: (current) => formatDate(current.getValue() as string),
  },
];
