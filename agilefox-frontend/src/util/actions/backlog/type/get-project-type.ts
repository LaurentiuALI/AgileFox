"use server";

import { Type } from "@/types/Type";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getProjectTypes({
  projectId,
}: {
  projectId: number;
}): Promise<Type[] | undefined> {
  const idToken = await getIdToken();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/type?projectId=${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("🚀 ~ getAllTypes ~ response:", response);
    const data = await response.json();
    console.log("🚀 ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return undefined;
  }
}
