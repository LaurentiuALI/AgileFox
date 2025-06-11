"use server";

import { Edge } from "@xyflow/react";
import { getIdToken } from "@/util/SessionTokenAccesor";

/**
 * Submits a new backlog item to the backend API.
 * @param formData - The form data containing the backlog item details.
 * @returns A boolean indicating whether the submission was successful.
 * @throws Error if the user is not authenticated or the request fails.
 */
export async function submitPractice({
  id,
  projectId,
  title,
  nodes,
  edges,
}: {
  id?: string;
  projectId: number;
  title: string;
  nodes?: Node[];
  edges?: Edge[];
}): Promise<boolean> {
  const accessToken = await getIdToken();

  if (!accessToken) {
    console.error(
      "[submitPractice] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/agilestudio/practice`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          projectId,
          title,
          nodes,
          edges,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        `[sbmitPractice] Failed to submit practice. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to submit practice item.");
    }

    console.log("[submitPractice] Practice submitted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[submitPractice] Error occurred while submitting practice:",
      error
    );
    return false;
  }
}
