"use client";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postProject } from "@/util/actions/project/post-project";

const generateAbbreviation = (title: string) => {
  if (!title) return "";

  // Remove special characters and extra spaces
  const words = title
    .replace(/[^a-zA-Z0-9\s]/g, "") // Keep only letters, numbers, and spaces
    .trim()
    .split(/\s+/) // Split by spaces
    .filter((word) => word.length > 0); // Remove empty words

  let abbreviation = "";

  if (words.length >= 3) {
    abbreviation = words.map((word) => word[0]).join(""); // First letter of each word
  } else if (words.length === 2) {
    abbreviation = words.map((word) => word.substring(0, 2)).join(""); // First two letters of each
  } else if (words.length === 1) {
    abbreviation = words[0].substring(0, 3); // First 3-4 letters
  }

  return abbreviation.toUpperCase();
};

export default function AddProject() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [abbrev, setAbbrev] = useState<string>("");
  const [estimationType, setEstimationType] = useState<string>("");
  const handleCreate = async () => {
    postProject({ name, description, estimationType, abbrev });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add new project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add A New Project</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="name" className="text-right">
            Name of the project
          </Label>
          <Input
            id="name"
            placeholder="Name for the new project..."
            className="col-span-3"
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => setAbbrev(generateAbbreviation(e.target.value))}
            value={name}
          />

          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            placeholder="What does your project do?"
            className="col-span-3"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <Label htmlFor="estimation" className="text-right">
            Estimation type
          </Label>

          <Select onValueChange={(value) => setEstimationType(value)}>
            <SelectTrigger className="w-[200px]" id="estimation">
              <SelectValue placeholder="Select an estimation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estimation type</SelectLabel>
                <SelectItem value="DAYS">Days</SelectItem>
                <SelectItem value="STORY_POINTS">Story Points</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label htmlFor="abbrev" className="text-right">
            Abbreviation
          </Label>
          <Input
            id="abbrev"
            placeholder="Choose an abbreviation..."
            className="col-span-3"
            onChange={(e) => setAbbrev(e.target.value)}
            value={abbrev}
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
