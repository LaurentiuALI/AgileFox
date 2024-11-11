"use server";

import { BacklogItem } from "@/types/BacklogItem";

export async function getAllBacklogItems({
  projectId,
}: {
  projectId: number;
}): Promise<BacklogItem[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/backlogitem?projectId=${projectId}`
    );
    const data = await response.json();
    console.log("🚀 ~ getAllBacklogItems ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ getAllBacklogItems ~ error:", error);
    return [];
  }
}
