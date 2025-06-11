import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { IconNodeType } from "./types";
import { useState } from "react";

export function ChangeNodeDialog({
  current,
  setOpenDialog,
  data,
}: {
  current: boolean;
  setOpenDialog: (open: boolean) => void;
  data: IconNodeType & {
    id: string;
    onNodeLabelChange?: (id: string, newLabel: string) => void;
    onNodeDelete?: (id: string) => void;
  };
}) {
  const [label, setLabel] = useState(data.label || "");
  const [description, setDescription] = useState(data.description || "");
  const [error, setError] = useState<string[]>();

  const handleChangeNode = (event: React.FormEvent) => {
    event.preventDefault();
    setError(undefined);
    if (!label) {
      setError(["Label is required."]);
      setOpenDialog(true);
      return;
    } else if (label.length < 3) {
      setError(["Label must be at least 3 characters."]);
      setOpenDialog(true);
      return;
    }

    data.onNodeLabelChange?.(data.id, label);
    data.onNodeDescriptionChange?.(data.id, description);
  };

  return (
    <Dialog
      open={current}
      onOpenChange={() => {
        setOpenDialog(!current);
        setError([]);
      }}
    >
      <DialogContent className="sm:max-w-[425px] z-50">
        <form onSubmit={handleChangeNode}>
          <DialogHeader>
            <DialogTitle>Add new element</DialogTitle>
            <DialogDescription>
              Create new element and add it to the flow.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="What is it?"
                className="col-span-3"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="What it does?"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
