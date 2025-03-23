import UserList from "./userList/userList";
import { UserSelect } from "./userSelect";

export default async function Project({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <>
      <UserList projectId={id} />
      <UserSelect projectId={id} />
    </>
  );
}
