"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";
export async function tickCheckItem({
  checkItemId,
}: {
  checkItemId: number;
}): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[tickCheckItem] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/checkitem/check/${checkItemId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `[tickCheckItem] Failed to tick check item. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to tick check item.");
    }

    console.log("[tickCheckItem] Check item ticked successfully.");
    return true;
  } catch (error) {
    console.error(
      "[tickCheckItem] Error occurred while ticking check item:",
      error
    );
    return false;
  }
}
