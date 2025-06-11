"use server";

import { Type } from "@/types/Type";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getProjectTypes({
  projectId,
}: {
  projectId: number | string;
}): Promise<Type[]> {
  const accessToken = await getAccessToken();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/type?projectId=${projectId}`,
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
    throw new Error("Failed to fetch project types");
  }
}
