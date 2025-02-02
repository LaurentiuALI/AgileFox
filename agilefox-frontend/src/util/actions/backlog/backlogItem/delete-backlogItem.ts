"use server";

import { getIdToken } from "@/util/SessionTokenAccesor";

/**
 * Deletes a backlog item from the backend API.
 * @param itemId - The ID of the backlog item to be deleted.
 * @returns A boolean indicating whether the deletion was successful.
 * @throws Error if the user is not authenticated or the request fails.
 */
export async function deleteBacklogItem(itemId: number): Promise<boolean> {
  const idToken = await getIdToken();

  if (!idToken) {
    console.error(
      "[deleteBacklogItem] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/backlogitem/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
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
