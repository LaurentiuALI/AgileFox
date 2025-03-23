import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleFilter({
  options,
  onChange,
}: {
  options: string[];
  onChange: (event) => void;
}) {
  return (
    <ToggleGroup type="multiple">
      {options.map((option) => (
        <ToggleGroupItem key={option} value={option} onChange={onChange}>
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
