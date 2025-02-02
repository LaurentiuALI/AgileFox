"use server";

import { BacklogItem, BacklogItemSchema } from "@/types/BacklogItem";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getBacklogItemById({
  projectId,
  backlogItemId,
}: {
  projectId: number;
  backlogItemId: number;
}): Promise<BacklogItem | undefined> {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/backlogitem/${backlogItemId}?projectId=${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching backlog item:", response.statusText);
      return undefined;
    }

    const data = await response.json();

    return BacklogItemSchema.parse(data); // Validate and return the parsed object
  } catch (error) {
    console.error("Error in getBacklogItemById:", error);
    return undefined;
  }
}
