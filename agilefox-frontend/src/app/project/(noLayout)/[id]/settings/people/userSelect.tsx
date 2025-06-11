"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetUsers } from "@/data/user/useUsers";
import { addUserToProject } from "@/util/actions/user/add-user-to-project";

export function UserSelect({ projectId }: { projectId: number }) {
  const { data: users, isLoading, isError } = useGetUsers();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const addUser = () => {
    addUserToProject({ username: value, projectId });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error</div>;

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? users.find((user) => user.username === value)?.firstName
              : "Select user..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.username}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {user.firstName +
                      " " +
                      user.lastName +
                      " (" +
                      user.username +
                      ")"}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === user.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button onClick={addUser}>Add user to the project</Button>
    </div>
  );
}
