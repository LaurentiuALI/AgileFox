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
  const [types, setTypes] = useState<Type[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedType, setSelectedType] = useState<number | undefined>();
  const [filteredStates, setFilteredStates] = useState<State[]>([]);

  useEffect(() => {
    async function fetchData() {
      const typeResult = await getProjectTypes({ projectId });
      setTypes(typeResult);
      const stateResult = await getProjectStates({ projectId });
      setStates(stateResult);
    }
    fetchData();
  }, [projectId]); // Fetch data when projectId changes

  useEffect(() => {
    if (selectedType !== undefined) {
      setFilteredStates(states.filter((s) => s.typeId === selectedType));
    } else {
      setFilteredStates([]); // Reset if no type is selected
    }
  }, [selectedType, states]);

  const form = useForm<z.infer<typeof backlogItemSchema>>({
    resolver: zodResolver(backlogItemSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof backlogItemSchema>) {
    if (!types.length || !states.length) return;

    const selectedTypeObj = types.find((t) => t.name === values.type);
    const selectedStateObj = filteredStates.find(
      (s) => s.name === values.state
    );

    if (!selectedTypeObj || !selectedStateObj) return;

    submitBacklogItem({
      projectId,
      typeId: selectedTypeObj.id,
      stateId: selectedStateObj.id,
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
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedType(types.find((t) => t.name === value)?.id);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-neutral-900">
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.id + " " + type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State Select */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">State</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredStates.map((state) => (
                    <SelectItem key={state.id} value={state.name}>
                      {state.id + " " + state.name}
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
