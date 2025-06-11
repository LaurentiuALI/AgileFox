"use server";

import { Type, TypeSchema } from "@/types/Type";
import { getAccessToken } from "@/util/SessionTokenAccesor";
export async function postType({
  projectId,
  name,
}: {
  projectId: string | number;
  name: string;
}): Promise<Type | undefined> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error("[postType] User is not authenticated or token is missing.");
    throw new Error("Authentication required. Please log in.");
  }

  if (!name) {
    throw new Error("Type name is required.");
  }
  const response = await fetch(`${process.env.BACKEND_URL}/type`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      name,
    }),
  });

  if (!response.ok) {
    console.error(
      `[postType] Failed to post Type. Status: ${response.status}, Message: ${response.statusText}`
    );
    throw new Error("Failed to post type: " + response.statusText);
  }

  const data = await response.json();
  console.log("[postType] Type posted successfully.");
  return TypeSchema.parse(data);
}
