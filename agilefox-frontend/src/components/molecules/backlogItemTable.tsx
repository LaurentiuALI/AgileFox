import { getAllBacklogItems } from "@/util/actions/backlog/backlogItem/get-all-backlogItems";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default async function BacklogItemTable({
  projectId,
}: {
  projectId: number;
}) {
  const backlogItems = await getAllBacklogItems({ projectId });
  return (
    <Table>
      <TableCaption>A list of your recent backlog items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">UID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>State</TableHead>
          <TableHead className="text-right">projectId</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {backlogItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.uid}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.stateName}</TableCell>
            <TableCell className="text-right">{item.projectId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total no. of items</TableCell>
          <TableCell className="text-right">{backlogItems.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
