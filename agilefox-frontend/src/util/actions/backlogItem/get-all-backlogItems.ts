"use server";

import { BacklogItem } from "@/types/BacklogItem";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getAllBacklogItems({
  projectId,
}: {
  projectId: number;
}): Promise<BacklogItem[]> {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/backlogitem?projectId=${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("🚀 ~ getAllBacklogItems ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ getAllBacklogItems ~ error:", error);
    return [];
  }
}
