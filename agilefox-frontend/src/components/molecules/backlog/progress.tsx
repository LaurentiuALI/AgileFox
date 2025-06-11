"use client";

import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { redirect } from "next/navigation";

function normalizeRange(value: number, min: number, max: number): number {
  // Ensure the value is within the provided range
  if (value < min || value > max) {
    throw new Error(`Value must be between ${min} and ${max}`);
  }

  return ((value - min) / (max - min)) * 100;
}

export default function ProgressState({ backlogItemId, actualScore, totalScore }: {
  backlogItemId: number;
  actualScore: number;
  totalScore: number;
}) {
  // const { data, isLoading } = useGetBacklogItemScore({ backlogItemId });

  // if (isLoading) return <div>Loading…</div>

  // const { totalScore = 0, actualScore = 0 } = data || {}

  const normalizedActualScore = normalizeRange(actualScore, 0, totalScore);
  return (
    <div className="flex items-center gap-4">
      <Play onClick={() => redirect(`refining/${backlogItemId}`)} />
      <Progress value={normalizedActualScore} className="w-32" />
    </div>
  );
}
