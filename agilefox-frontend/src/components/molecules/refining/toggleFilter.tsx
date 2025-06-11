import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function ToggleFilter({
  options,
  columnFilters,
  setColumnFilters,
}: {
  options: string[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: (value: ColumnFiltersState) => void;
}) {
  return (
    <ToggleGroup type="multiple">
      {options.map((option) => (
        <ToggleGroupItem
          key={option}
          value={option}
          onClick={() => {
            const currentStateFilter = columnFilters.find(
              (filter) => filter.id === "state"
            );
            const currentStates = (currentStateFilter?.value as string[]) ?? [];

            const newStates = currentStates.includes(option)
              ? currentStates.filter((s) => s !== option)
              : [...currentStates, option];

            const newFilters: ColumnFiltersState = currentStateFilter
              ? columnFilters.map((filter) =>
                filter.id === "state"
                  ? { ...filter, value: newStates }
                  : filter
              )
              : [...columnFilters, { id: "state", value: [option] }];

            setColumnFilters(newFilters);
          }}
        >
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
