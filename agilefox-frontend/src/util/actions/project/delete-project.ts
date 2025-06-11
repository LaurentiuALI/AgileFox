"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function deleteProject(projectId: number): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[deleteProject] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/project/${projectId}`,
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
        `[deleteProject] Failed to delete project. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to delete project.");
    }

    console.log("[project] Project deleted successfully.");
    return true;
  } catch (error) {
    console.error(
      "[project] Error occurred while deleting project:",
      error
    );
    return false;
  }
}
