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
import { postState } from "@/util/actions/backlog/state/post-state";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function AddStateDialog({
  projectId,
  typeId,
}: {
  projectId: string | number;
  typeId: string | number;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      await postState({
        projectId,
        name: name,
        description: description,
        typeId,
      });
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="flex justify-center items-center">
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

          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="w-full flex justify-center items-center gap-10">
          <Button>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
