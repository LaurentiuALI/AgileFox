"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function deletePractice(practiceId: string): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[deletePractice] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/agilestudio/practice?id=${practiceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error(
        `[deletePractice] Failed to delete practice. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to delete practice.");
    }

    console.log("[deletePractice] Practice deleted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[deletePractice] Error occurred while deleting practice1:",
      error
    );
    return false;
  }
}
