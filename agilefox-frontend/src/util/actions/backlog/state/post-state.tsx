"use server";

import { State } from "@/types/State";
import { getIdToken } from "@/util/SessionTokenAccesor";
export async function postState({
  projectId,
  name,
  description,
}: {
  projectId: string | number;
  name: string;
  description: string;
}): Promise<State | undefined> {
  const idToken = await getIdToken();

  if (!idToken) {
    console.error("[postState] User is not authenticated or token is missing.");
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/state`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        name,
        description,
      }),
    });

    if (!response.ok) {
      console.error(
        `[postState] Failed to post state. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to post state.");
    }

    const data = await response.json();
    console.log("[postState] State posted successfully.");
    return data;
  } catch (error) {
    console.error("[postState] Error occurred while posting state:", error);
  }
}
