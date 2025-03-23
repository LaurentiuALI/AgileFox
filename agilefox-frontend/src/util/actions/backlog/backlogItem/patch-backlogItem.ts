"use server";

import { getIdToken } from "@/util/SessionTokenAccesor";

export async function patchBacklogItem({
  id,
  projectId,
  username,
  title,
  description,
}: {
  id: number;
  projectId?: number;
  username?: string;
  title?: string;
  description?: string;
}): Promise<boolean> {
  const idToken = await getIdToken();

  if (!idToken) {
    console.error("User is not authenticated or token is missing.");
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/backlogitem/item?id=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, username, title, description }), // Partial update
      }
    );

    if (!response.ok) {
      console.error(
        `[patch] Failed to patch backlog item. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to patch backlog item.");
    }

    console.log("[patch] Backlog item patched successfully.");
    return true;
  } catch (error) {
    console.error("[patch] Error occurred while patching backlog item:", error);
    return false;
  }
}
