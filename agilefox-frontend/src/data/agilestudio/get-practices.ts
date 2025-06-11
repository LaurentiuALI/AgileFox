import { getPractices } from "@/util/actions/agilestudio/get-practices";
import { useQuery } from "@tanstack/react-query";

export function useGetPractices({
  projectId,
  practiceId,
}: {
  projectId: number;
  practiceId?: number;
}) {
  return useQuery({
    queryFn: () =>
      getPractices({
        projectId: projectId as number,
        practiceId: practiceId,
      }),
    queryKey: ["practices", projectId, practiceId],
    enabled: projectId !== undefined || practiceId !== undefined
  });
}
