"use server";

import { State } from "@/types/State";

export async function getStateById({
  id,
}: {
  id: string;
}): Promise<State | undefined> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/state/${id}`);
    const data = await response.json();
    console.log("🚀 ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return undefined;
  }
}
