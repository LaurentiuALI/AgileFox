"use server";

import { getIdToken } from "@/util/SessionTokenAccesor";

/**
 * Submits a new backlog item to the backend API.
 * @param formData - The form data containing the backlog item details.
 * @returns A boolean indicating whether the submission was successful.
 * @throws Error if the user is not authenticated or the request fails.
 */
export async function submitBacklogItem(formData: {
  projectId: number;
  typeId: number;
  stateId: number;
  title: string;
  description: string;
}): Promise<boolean> {
  const idToken = await getIdToken();

  if (!idToken) {
    console.error(
      "[submitBacklogItem] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/backlogitem/item`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error(
        `[submitBacklogItem] Failed to submit backlog item. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to submit backlog item.");
    }

    console.log("[submitBacklogItem] Backlog item submitted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[submitBacklogItem] Error occurred while submitting backlog item:",
      error
    );
    return false;
  }
}
