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
import { postType } from "@/util/actions/backlog/type/post-type";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function AddTypeDialog({
  projectId,
}: {
  projectId: string | number;
}) {
  const [name, setName] = useState<string>("");
  const handleCreate = async () => {
    try {
      await postType({
        projectId,
        name: name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="flex justify-center items-center">
        <Button className="ml-4 rounded-xl">
          <PlusCircle className="text-white" /> Add Type{" "}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Type</DialogTitle>
          <DialogDescription>
            Configure a new Type for your backlog
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
        </div>
        <div className="w-full flex justify-center items-center gap-10">
          <Button>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
