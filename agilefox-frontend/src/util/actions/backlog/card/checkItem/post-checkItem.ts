"use server";

import { CheckItem, CheckItemSchema } from "@/types/CheckItem";
import { getAccessToken } from "@/util/SessionTokenAccesor";
export async function postCheckitem({
  cardId,
  information,
}: {
  cardId: string | number;
  information: string;
}): Promise<CheckItem | undefined> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[postCheckitem] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/checkitem`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId,
        information,
      }),
    });

    if (!response.ok) {
      console.error(
        `[postCheckitem] Failed to post check item. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to post check item.");
    }

    const data = await response.json();
    console.log("[postCheckitem] Check item posted successfully.");
    return CheckItemSchema.parse(data);
  } catch (error) {
    console.error(
      "[postCheckitem] Error occurred while posting check item:",
      error
    );
  }
}
