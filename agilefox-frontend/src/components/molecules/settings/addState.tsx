import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { postState } from "@/util/actions/backlog/state/post-state";

export default function AddStateDialog({
  projectId,
}: {
  projectId: string | number;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const handleCreate = async () => {
    try {
      await postState({
        projectId,
        name: name,
        description: description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex justify-center items-center">
        <Button className="ml-4 rounded-xl">
          <PlusCircle className="text-white" /> Add State{" "}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add State</DialogTitle>
          <DialogDescription>
            Configure a new State for your backlog
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Title for your card"
            className="col-span-3"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            placeholder="What does your card accomplish?"
            className="col-span-3"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-10">
          <Button>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
