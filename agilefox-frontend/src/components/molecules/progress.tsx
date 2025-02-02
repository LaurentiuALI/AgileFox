"use client";

import { Progress } from "@/components/ui/progress";
import { useGetBacklogItemScore } from "@/data/get-card-score";
import { Play } from "lucide-react";
import { redirect } from "next/navigation";

function normalizeRange(value: number, min: number, max: number): number {
  // Ensure the value is within the provided range
  if (value < min || value > max) {
    throw new Error(`Value must be between ${min} and ${max}`);
  }

  return ((value - min) / (max - min)) * 100;
}

export default function ProgressState({ id: backlogItemId }: { id: number }) {
  const { data, isLoading } = useGetBacklogItemScore({ backlogItemId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { totalScore, actualScore } = data ?? { totalScore: 1, actualScore: 1 };

  const normalizedActualScore = normalizeRange(actualScore, 0, totalScore + 1);
  return (
    <div className="flex items-center gap-4">
      <Play onClick={() => redirect(`item/${backlogItemId}`)} />
      <Progress value={normalizedActualScore} className="w-32" />
    </div>
  );
}
