"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUsers } from "@/data/get-users";
import { BacklogItem } from "@/types/BacklogItem";
import { patchBacklogItem } from "@/util/actions/backlog/backlogItem/patch-backlogItem";

export default function AsigneeSelector({
  backlogItem,
}: {
  backlogItem: BacklogItem;
}) {
  const { data, isLoading, isError } = useGetUsers();

  if (isLoading) {
    return (
      <Badge className="m-4 rounded-xl flex gap-8 p-2 bg-neutral-600">
        Loading...
      </Badge>
    );
  }
  if (isError || !data) {
    return (
      <Badge className="m-4 rounded-xl flex gap-8 p-2 bg-neutral-600">
        Error loading assignees
      </Badge>
    );
  }

  const onChange = async (value: string) => {
    await patchBacklogItem({
      id: backlogItem.id,
      projectId: backlogItem.projectId,
      username: value, // Only updating username
    });
  };

  const assignee = data.find((user) => user.username === backlogItem.username);

  return (
    <Select defaultValue={assignee?.username} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] border-none shadow-none bg-nonelocalhost:3000
       rounded-xl">
        <SelectValue placeholder="Select assignee" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asignee</SelectLabel>
          {data.map((user) => (
            <SelectItem key={user.id} value={user.username}>
              {user.firstName} {user.lastName} ({user.username})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
