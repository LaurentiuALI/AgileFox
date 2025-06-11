"use server";

import { State } from "@/types/State";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getProjectStates({
  projectId,
}: {
  projectId: string | number;
}): Promise<State[]> {
  const accessToken = await getAccessToken();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/state?projectId=${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("🚀 ~ error:", error);
    throw new Error("Failed to fetch project states");
  }
}
