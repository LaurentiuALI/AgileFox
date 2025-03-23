"use server";

import { Practice, PracticeSchema } from "@/types/agilestudio/practiceTypes";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getPractices({
  projectId,
  practiceId,
}: {
  projectId: number;
  practiceId?: number;
}): Promise<Practice[] | Practice> {
  const idToken = await getIdToken();

  if (!idToken) {
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
  const url = `${
    process.env.BACKEND_URL
  }/agilestudio/practice?${queryParams.toString()}`;
  console.log("🚀 ~ url:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("🚀 ~ data:", data);

    if (practiceId !== undefined && data.length == 1) {
      return PracticeSchema.parse(data.pop());
    } else {
      return PracticeSchema.array().parse(data);
    }
  } catch (error) {
    console.error("Error in getPractice:", error);
    throw new Error("Error in getPractice");
  }
}
