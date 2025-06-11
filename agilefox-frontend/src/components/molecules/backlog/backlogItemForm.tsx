"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { backlogItemSchema } from "@/schemas/backlogItem";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { useCreateBacklogItem } from "@/data/backlog/backlogItem/useBacklogItem";
import { useGetProjectType } from "@/data/backlog/type/useType";
import { Textarea } from "@/components/ui/textarea";
import { useGetUsersOfProject } from "@/data/project/useProject";

export function BacklogItemForm({ projectId }: { projectId: number }) {

  const mutation = useCreateBacklogItem();
  const { data: projectTypes } = useGetProjectType({ projectId });
  const { data: users } = useGetUsersOfProject({ projectId });

  const form = useForm<z.infer<typeof backlogItemSchema>>({
    resolver: zodResolver(backlogItemSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof backlogItemSchema>) {
    mutation.mutate({ projectId, typeId: values.type, title: values.title, description: values.description, username: values.assignee });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-80">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Type</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]" ref={field.ref}>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-neutral-900"

                >
                  {projectTypes?.map((type) => (
                    <SelectItem key={type.id} value={`${type.id}`}  >
                      {type.id + " " + type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Title</FormLabel>
              <FormControl>
                <Input placeholder="Item title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Description
              </FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Assignee</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]" ref={field.ref}>
                    <SelectValue placeholder="Select an assignee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-neutral-900"

                >
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={`${user.username}`}  >
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
