"use server";

import { State } from "@/types/State";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getProjectStates({
  projectId,
}: {
  projectId: number;
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
    console.log("🚀 ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return undefined;
  }
}
