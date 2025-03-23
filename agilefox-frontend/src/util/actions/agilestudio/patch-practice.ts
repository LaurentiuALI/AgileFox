"use server";

import { Edge, Node } from "@/types/agilestudio/practiceTypes";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function patchPractice({
  id,
  projectId,
  title,
  nodes,
  edges,
}: {
  id: string;
  projectId?: number;
  title?: string;
  nodes?: Node[];
  edges?: Edge[];
}): Promise<boolean> {
  const idToken = await getIdToken();

  if (!idToken) {
    console.error("User is not authenticated or token is missing.");
    throw new Error("Authentication required. Please log in.");
  }

  // Create request body with only defined fields
  const requestBody: Record<string, number | string | Node[] | Edge[]> = {};
  if (projectId !== undefined) requestBody.projectId = projectId;
  if (title !== undefined) requestBody.title = title;
  if (nodes !== undefined) requestBody.nodes = nodes;
  if (edges !== undefined) requestBody.edges = edges;

  console.log("PATCHING PRACTICE:", id, "WITH:", requestBody);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/agilestudio/practice?id=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Only send defined fields
      }
    );

    if (!response.ok) {
      console.error(
        `[patch] Failed to patch practice. Status: ${response.status}, Message: ${response.statusText}`
      );
      throw new Error("Failed to patch practice.");
    }

    console.log("[patch] Practice patched successfully.");
    return true;
  } catch (error) {
    console.error("[patch] Error occurred while patching practice:", error);
    return false;
  }
}
