"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlowContainer from "./flowContainer";
import { PlusCircle, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetPractices } from "@/data/agilestudio/get-practices";
import { Practice } from "@/types/agilestudio/practiceTypes";
import { useCreatePractice, useDeletePractice } from "@/data/agilestudio/usePractice";
import RoleGuard from "@/components/molecules/RoleGuard";
import { useSession } from "next-auth/react";

export default function PracticeTabs({ projectId }: { projectId: number }) {
  const { data: session } = useSession();

  const { data } = useGetPractices({ projectId: projectId });
  const [practice, setPractice] = useState<Practice[]>([]);

  const addMutation = useCreatePractice();
  const deletePractice = useDeletePractice({ projectId });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setPractice(data);
    }
  }, [data]);
  const onAddTab = () => {
    const newLabel = window.prompt("Enter new label");
    addMutation.mutate({ title: newLabel || "New Practice", projectId: projectId });
  };
  const onDeleteTab = (practiceId: string) => {
    if (window.confirm("Do you want to delete this practice?")) {
      deletePractice.mutate({ practiceId });
    }

  }
  return (
    <Tabs defaultValue="account" className="w-full h-full">
      <TabsList className="w-full flex">
        {practice.map((practice) => (
          <TabsTrigger key={practice.id} value={practice.title} className="group p-4 relative">
            <RoleGuard roles={session?.user.roles} allowed={["scrum master"]}>
              <Trash className="group-hover:visible invisible text-white bg-red-500 rounded-full p-2 w-8 h-8 mr-2 absolute -left-4" onClick={() => onDeleteTab(practice.id)} />
            </RoleGuard>
            {practice.title}
          </TabsTrigger>
        ))}

        <RoleGuard roles={session?.user.roles} allowed={["scrum master"]}>
          <div onClick={onAddTab}>
            <PlusCircle />
          </div>
        </RoleGuard>
      </TabsList>
      {practice.map((practice) => (
        <TabsContent
          value={practice.title}
          key={practice.id}
          className="w-full h-full"
        >
          <div className="w-full h-full ">
            <FlowContainer practice={practice} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
