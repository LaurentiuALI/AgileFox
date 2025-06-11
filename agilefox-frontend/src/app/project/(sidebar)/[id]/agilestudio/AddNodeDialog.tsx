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
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Node } from "@xyflow/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export function AddNodeDialog({
  current,
  setOpenDialog,
  setNodes,
  newNodeData,
}: {
  current: boolean;
  setOpenDialog: (open: boolean) => void;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  newNodeData: Node | undefined;
}) {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string[]>();

  if (!newNodeData) return null;

  const handleAddNode = (event: FormEvent) => {
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
    newNodeData.data.label = label;
    newNodeData.data.description = description;
    setNodes((nds) => nds.concat(newNodeData));
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
        <form onSubmit={handleAddNode}>
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
              <Textarea
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
