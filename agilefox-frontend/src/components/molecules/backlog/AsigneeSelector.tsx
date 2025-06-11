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
import { useUpdateBacklogItem } from "@/data/backlog/backlogItem/useBacklogItem";
import { useGetUsersOfProject } from "@/data/project/useProject";

export default function AsigneeSelector({ value, backlogItemId, projectId }: { value: string, backlogItemId: number, projectId: number }) {

  const mutation = useUpdateBacklogItem();
  const { data, isLoading, isError } = useGetUsersOfProject({ projectId });
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

  const onChange = (value: string) => {
    mutation.mutate({ id: backlogItemId, projectId: projectId, username: value });
  };

  return (
    <Select
      defaultValue={value == null ? "null" : value}
      onValueChange={onChange}
    >
      <SelectTrigger
        className="w-[180px] border-none shadow-none bg-none
       rounded-xl"
      >
        <SelectValue placeholder="Unassigned" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asignee</SelectLabel>
          <SelectItem value="null"> Unassigned </SelectItem>
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
