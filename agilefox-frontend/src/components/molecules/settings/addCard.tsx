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
import { postCard } from "@/util/actions/backlog/card/post-card";
import { useState } from "react";

export default function AddCardDialog({
  typeId,
  stateId,
  projectId,
}: {
  typeId: string | number;
  stateId: string | number;
  projectId: string | number;
}) {
  const [title, setTitle] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const handleCreate = async () => {
    try {
      await postCard({
        projectId,
        typeId,
        stateId,
        title: title,
        purpose: purpose,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircle className="w-16 h-16 text-neutral-600" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            Configure a new card for your backlog
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Title for your card"
            className="col-span-3"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <Label htmlFor="purpose" className="text-right">
            Purpose
          </Label>
          <Input
            id="purpose"
            placeholder="What does your card accomplish?"
            className="col-span-3"
            onChange={(e) => setPurpose(e.target.value)}
            value={purpose}
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
