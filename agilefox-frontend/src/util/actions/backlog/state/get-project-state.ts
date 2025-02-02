"use server";

import { State } from "@/types/State";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getProjectStates({
  projectId,
}: {
  projectId: string;
}): Promise<State[] | undefined> {
  const idToken = await getIdToken();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/state?projectId=${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("🚀 ~ error:", error);
    return undefined;
  }
}
