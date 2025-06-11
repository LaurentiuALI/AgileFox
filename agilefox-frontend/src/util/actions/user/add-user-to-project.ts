"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function addUserToProject({
  username,
  projectId,
}: {
  username: string;
  projectId: number;
}): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[addUserToProject] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/project/add/${projectId}/${username}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `[addUserToProject] Failed to submit user to project. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to submit user to project.");
    }

    console.log("[addUserToProject] User submitted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[addUserToProject] Error occurred while submitting user:",
      error
    );
    return false;
  }
}
