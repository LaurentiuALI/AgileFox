"use server";

import { State } from "@/types/State";
import { getAccessToken } from "@/util/SessionTokenAccesor";
export async function updateState({
  id,
  projectId,
  name,
  description,
  typeId,
  stateOrder,
}: {
  id: string | number;
  projectId: string | number;
  name: string;
  description: string | undefined;
  typeId: string | number;
  stateOrder: number;
}): Promise<State | undefined> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[updateState] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/state`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        projectId,
        name,
        description,
        typeId,
        stateOrder,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(
        `[updateState] Failed to update state. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error(error.message);
    }

    const data = await response.json();
    console.log("[updateState] State update successfully.");
    return data;
  } catch (error) {
    console.error("[updateState] Error occurred while updating state:", error);
    throw error;
  }
}
