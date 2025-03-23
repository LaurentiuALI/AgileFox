"use server";

import { getIdToken } from "@/util/SessionTokenAccesor";

export async function postProject({
  name,
  description,
  estimationType,
  abbrev,
}: {
  name: string;
  description: string;
  estimationType: string;
  abbrev: string;
}): Promise<boolean> {
  const idToken = await getIdToken();

  if (!idToken) {
    console.error(
      "[postProject] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/project`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        estimation_type: estimationType,
        abbrev: abbrev,
      }),
    });

    if (!response.ok) {
      console.error(
        `[postProject] Failed to submit project. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to project backlog item.");
    }

    console.log("[postProject] Project submitted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[postProject] Error occurred while submitting porject:",
      error
    );
    return false;
  }
}
