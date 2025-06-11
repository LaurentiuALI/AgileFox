"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function deleteCard(cardId: number): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[deleteCard] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    console.log("[deleteCard] Attempting to delete card with ID:", cardId);
    const response = await fetch(
      `${process.env.BACKEND_URL}/card/${cardId}`,
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
        `[deleteCard] Failed to delete card. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to delete card.");
    }

    console.log("[deleteCard] Card deleted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[deleteCard] Error occurred while deleting card:",
      error
    );
    return false;
  }
}
