"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function deleteBacklogItem(itemId: number): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[deleteBacklogItem] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/backlogitem/item?id=${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error(
        `[deleteBacklogItem] Failed to delete backlog item. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to delete backlog item.");
    }

    console.log("[deleteBacklogItem] Backlog item deleted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[deleteBacklogItem] Error occurred while deleting backlog item:",
      error
    );
    return false;
  }
}
