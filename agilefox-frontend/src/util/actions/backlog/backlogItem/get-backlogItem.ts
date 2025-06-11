"use server";

import { BacklogItem, BacklogItemSchema } from "@/types/BacklogItem";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getBacklogItem({
  projectId,
  backlogItemId
}: {
  projectId: number;
  backlogItemId: number;
}): Promise<BacklogItem> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  // Ensure the endpoint matches your backend's mapping
  const url = `${process.env.BACKEND_URL
    }/backlogitem/item/${backlogItemId}?projectId=${projectId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return BacklogItemSchema.parse(data);
  } catch (error) {
    console.error("Error in getBacklogItems:", error);
    throw new Error("Error in getBacklogItems");
  }
}
