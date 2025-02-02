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
import { postCheckitem } from "@/util/actions/backlog/card/checkItem/post-checkItem";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function AddCheckitemDialog({
  cardId,
}: {
  cardId: string | number;
}) {
  const [information, setInformation] = useState<string>("");
  const handleCreate = async () => {
    try {
      await postCheckitem({
        cardId,
        information: information,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <PlusCircle className="w-6 h-6 text-neutral-600 mt-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            Configure a new card for your backlog
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="checkitem" className="text-right">
            Check Item
          </Label>
          <Input
            id="checkitem"
            placeholder="Action to do for completing card"
            className="col-span-3"
            onChange={(e) => setInformation(e.target.value)}
            value={information}
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
