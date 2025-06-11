"use client";
import { useGetBacklogItemsOfUser } from "@/data/backlog/backlogItem/useBacklogItem";
import { BacklogItem } from "@/types/BacklogItem";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AssignedIssueList() {

  const { data, status } = useSession();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      if (data.user.username) {
        const username = data.user.username;
        setUsername(username);
      }
    }
  }, [data, status]);

  const { data: backlogItems, isError, isLoading } = useGetBacklogItemsOfUser({ username });
  if (isError || !data) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {backlogItems?.map((item: BacklogItem) => (
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
      {backlogItems?.length === 0 && (
        <div className="border p-2 bg-neutral-800 w-1/3 h-[60px] rounded-xl flex justify-between items-center">
          <div className="text-center">No assigned issues</div>
        </div>
      )}
    </div>
  );
}
