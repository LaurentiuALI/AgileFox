"use server";

import { BacklogItem, BacklogItemSchema } from "@/types/BacklogItem";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getBacklogItems({
  projectId,
  backlogItemId, // optional
  username, // optional
}: {
  projectId: number;
  backlogItemId?: number;
  username?: string;
}): Promise<BacklogItem[]> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  // Build query parameters dynamically
  const queryParams = new URLSearchParams();

  if (projectId !== undefined) {
    queryParams.append("projectId", projectId.toString());
  }
  if (backlogItemId !== undefined) {
    queryParams.append("id", backlogItemId.toString());
  }
  if (username) {
    queryParams.append("username", username);
  }

  // Ensure the endpoint matches your backend's mapping
  const url = `${process.env.BACKEND_URL
    }/backlogitem/item?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // if (backlogItemId !== undefined && data.length == 1) {
    //   return BacklogItemSchema.parse(data.pop());
    // } else {
    return BacklogItemSchema.array().parse(data);
    // }
  } catch (error) {
    console.error("Error in getBacklogItems:", error);
    throw new Error("Error in getBacklogItems");
  }
}
