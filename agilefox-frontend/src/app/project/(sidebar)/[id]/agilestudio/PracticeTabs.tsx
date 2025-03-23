"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlowContainer from "./flowContainer";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { submitPractice } from "@/util/actions/agilestudio/post-practice";
import { useGetPractices } from "@/data/agilestudio/get-practices";
import { Practice } from "@/types/agilestudio/practiceTypes";

export default function PracticeTabs({ projectId }: { projectId: number }) {
  const { data } = useGetPractices({ projectId: projectId });
  const [practice, setPractice] = useState<Practice[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setPractice(data);
    }
  }, [data]);
  const onAddTab = () => {
    const newLabel = window.prompt("Enter new label");
    if (newLabel != null) {
      console.log("SUBMITEAZA BA???");
      submitPractice({ title: newLabel, projectId: projectId });
    }
  };
  return (
    <Tabs defaultValue="account" className="w-full h-full">
      <TabsList className="w-full flex">
        {practice.map((practice) => (
          <TabsTrigger key={practice.id} value={practice.title}>
            {practice.title}
          </TabsTrigger>
        ))}
        <div onClick={onAddTab}>
          <PlusCircle />
        </div>
      </TabsList>
      {practice.map((practice) => (
        <TabsContent value={practice.title} key={practice.id}>
          <div className="w-full h-[100vh]">
            <FlowContainer practice={practice} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
