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
import { useCreateCard } from "@/data/card/useCard";
import { DialogClose } from "@radix-ui/react-dialog";

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
  const [open, setOpen] = useState<boolean>(false);
  const addMutation = useCreateCard();

  const handleCreate = async () => {
    try {
      console.log("Creating card with:", {
        projectId,
        typeId,
        stateId,
        title,
        purpose,
      });

      addMutation.mutate({
        projectId,
        typeId,
        stateId,
        title,
        purpose,
      });
      setOpen(false);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Card
        </Button>
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
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog >
  );
}
