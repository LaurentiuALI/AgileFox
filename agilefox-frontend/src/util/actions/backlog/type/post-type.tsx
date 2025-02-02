"use server";

import { Card, CardSchema } from "@/types/Card";
import { getIdToken } from "@/util/SessionTokenAccesor";
export async function postType({
  projectId,
  name,
}: {
  projectId: string | number;
  name: string;
}): Promise<Card | undefined> {
  const idToken = await getIdToken();

  if (!idToken) {
    console.error("[postType] User is not authenticated or token is missing.");
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/type`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        name,
      }),
    });

    if (!response.ok) {
      console.error(
        `[postType] Failed to post Type. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to post Type.");
    }

    const data = await response.json();
    console.log("[postType] Type posted successfully.");
    return CardSchema.parse(data);
  } catch (error) {
    console.error("[postType] Error occurred while posting Type:", error);
  }
}
