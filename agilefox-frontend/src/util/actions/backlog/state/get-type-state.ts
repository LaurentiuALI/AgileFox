"use server";

import { State } from "@/types/State";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getTypeStates({
  typeId,
}: {
  typeId: string;
}): Promise<State[] | undefined> {
  const idToken = await getIdToken();
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/state/type/${typeId}`,
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
  }
}
