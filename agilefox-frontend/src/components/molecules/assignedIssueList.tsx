"use client";
import { useGetBacklogItems } from "@/data/get-backlogItems";
import { BacklogItem } from "@/types/BacklogItem";

export default function AssignedIssueList({ username }: { username: string }) {
  const { data, isError, isLoading } = useGetBacklogItems({ username });
  if (isError || !data) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.map((item: BacklogItem) => (
        <div
          key={item.id}
          className="border p-2 bg-neutral-800 w-1/3 h-[60px] rounded-xl flex justify-between items-center"
        >
          <div>
            <div>{item.title}</div>
            <div>
              {item.uid} ⚬ {item.projectId}
            </div>
          </div>

          <div>{item.state.name}</div>
        </div>
      ))}
    </div>
  );
}
