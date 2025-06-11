import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Filters({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  return (
    <div className="flex items-center">
      <Search />
      <Input
        placeholder="Filter titles..."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(String(e.target.value))}
        className="max-w-sm w-60 m-4"
      />
    </div>
  );
}
