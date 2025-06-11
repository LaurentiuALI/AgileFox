import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DataTableSkeleton = () => {
  return (
    <div>
      <div className="flex gap-2 m-2">
        <Skeleton className="h-12 w-12  rounded-full" />
        <div className="w-full h-full flex items-center gap-2">
          <Skeleton className="h-12 w-[20%]  rounded-xl" />
          <Skeleton className="h-10 w-[15%]  rounded-xl" />
        </div>
        <Skeleton className="h-10 w-[10%] " />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
        <Skeleton className="h-12 w-full  rounded-full" />
      </div>
    </div>
  );
};

export default DataTableSkeleton;
