"use server";

import { Card, CardSchema } from "@/types/Card";
import { getAccessToken } from "@/util/SessionTokenAccesor";
export async function postCard({
  typeId,
  stateId,
  projectId,
  title,
  purpose,
}: {
  typeId: string | number;
  stateId: string | number;
  projectId: string | number;
  title: string;
  purpose: string;
}): Promise<Card | undefined> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error("[postCard] User is not authenticated or token is missing.");
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/card`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeId,
        stateId,
        projectId,
        title,
        purpose,
      }),
    });

    if (!response.ok) {
      console.error(
        `[postCard] Failed to post check item. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to post check item.");
    }

    const data = await response.json();
    console.log("[postCard] Check item posted successfully.");
    return CardSchema.parse(data);
  } catch (error) {
    console.error("[postCard] Error occurred while posting check item:", error);
  }
}
