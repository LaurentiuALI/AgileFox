"use server";

import { BacklogItemSchema } from "@/types/BacklogItem";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getAllBacklogItems({
  projectId,
}: {
  projectId: number | string;
}): Promise<(typeof BacklogItemSchema)[]> {
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
    return data;
  } catch (error) {
    console.error("🚀 ~ getAllBacklogItems ~ error:", error);
    return [];
  }
}
