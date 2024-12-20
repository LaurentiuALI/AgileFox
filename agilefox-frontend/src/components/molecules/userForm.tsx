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
import { getProjectTypes } from "@/util/actions/backlog/type/get-project-type";
import { useEffect, useState } from "react";
import { Type } from "@/types/Type";
import { State } from "@/types/State";
import { getProjectStates } from "@/util/actions/backlog/state/get-project-state";
import { submitBacklogItem } from "@/util/actions/backlog/backlogItem/post-backlogItem";

export function BacklogItemForm({ projectId }: { projectId: number }) {
  const [type, setType] = useState<Type[] | undefined>([]);
  const [state, setState] = useState<State[] | undefined>([]);

  useEffect(() => {
    async function fetchData() {
      const typeResult = await getProjectTypes({ projectId: projectId });
      setType(typeResult);
      const stateResult = await getProjectStates({ projectId: projectId });
      setState(stateResult);
    }
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const form = useForm<z.infer<typeof backlogItemSchema>>({
    resolver: zodResolver(backlogItemSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof backlogItemSchema>) {
    if (type === undefined || state === undefined) {
      return;
    }

    submitBacklogItem({
      projectId: projectId,
      typeId: type.filter((t) => t.name === values.type)[0].id,
      stateId: state.filter((s) => s.name === values.state)[0].id,
      title: values.title,
      description: values.description,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-80">
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
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {type?.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
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
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">State</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {state?.map((state) => (
                    <SelectItem key={state.id} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex justify-center items-center"> */}
        <Button type="submit">Submit</Button>
        {/* </div> */}
      </form>
    </Form>
  );
}
