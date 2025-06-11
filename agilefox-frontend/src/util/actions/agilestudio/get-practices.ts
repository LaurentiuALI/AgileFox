"use server";

import { Practice } from "@/types/agilestudio/practiceTypes";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getPractices({
  projectId,
  practiceId,
}: {
  projectId: number;
  practiceId?: number;
}): Promise<Practice[] | Practice> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  // Build query parameters dynamically
  const queryParams = new URLSearchParams();

  if (projectId !== undefined) {
    queryParams.append("projectId", projectId.toString());
  }
  if (practiceId !== undefined) {
    queryParams.append("id", practiceId.toString());
  }
  // Ensure the endpoint matches your backend's mapping
  const url = `${process.env.BACKEND_URL
    }/agilestudio/practice?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (practiceId !== undefined && data.length == 1) {
      return data.pop() as Practice;
    } else {
      return data as Practice[];
    }
  } catch (error) {
    console.error("Error in getPractice:", error);
    throw new Error("Error in getPractice");
  }
}
