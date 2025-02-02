"use server";

import { Type } from "@/types/Type";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getProjectTypes({
  projectId,
}: {
  projectId: string;
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("🚀 ~ error:", error);
    return undefined;
  }
}
