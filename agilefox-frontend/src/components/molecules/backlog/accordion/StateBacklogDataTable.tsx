"use client";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  ColumnSizingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BacklogItem } from "@/types/BacklogItem";
import { useState } from "react";

export default function StateBacklogDataTable({
  data,
  columns,
}: {
  data: BacklogItem[];
  columns: ColumnDef<BacklogItem>[];
}) {
  const [colSizing, setColSizing] = useState<ColumnSizingState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    onColumnSizingChange: setColSizing,
    state: {
      columnSizing: colSizing,
    },
    // getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className={`relative group text-white font-bold text-md border-b-2 border-neutral-900`} style={{
                    width: header.getSize(),
                  }}>
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute w-[5px] h-full top-0 right-0 opacity-0 group-hover:opacity-100 bg-neutral-600 cursor-col-resize touch-none select-none ${header.column.getIsResizing()
                        ? "bg-gradient-to-b from-orange-600 to-red-600"
                        : ""
                        }`}
                    />
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell style={{
                    minWidth: cell.column.columnDef.size,
                    maxWidth: cell.column.columnDef.size,
                  }} key={cell.id} className="overflow-hidden text-ellipsis">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div >
  );
}
