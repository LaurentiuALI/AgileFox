"use server";

import { Score, ScoreSchema } from "@/types/Score";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getBacklogItemScore({
  backlogItemId,
}: {
  backlogItemId: number | undefined;
}): Promise<Score> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/backlogitem/score/${backlogItemId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error in getBacklogItemScore");
    }
    const data = await response.json();
    return ScoreSchema.parse(data); // Validate and return the parsed object
  } catch (error) {
    console.error("Error in getBacklogItemScore:", error);
    throw new Error("Error in getBacklogItemScore");
  }
}
