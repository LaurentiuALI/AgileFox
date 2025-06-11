"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(theme == "dark" ? true : false);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(!isOpen);
  };

  // Prevent dropdown from closing when switching themes
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the event from propagating to parent (dropdown)
  };

  return (
    <div>
      <Switch
        checked={isOpen}
        onCheckedChange={() =>
          isOpen ? handleThemeChange("light") : handleThemeChange("dark")
        }
        id="theme-switch"
        onClick={handleClick}
        className="mr-2"
      />
      <Label htmlFor="theme-switch">Dark Mode</Label>
    </div>
  );
}
