"use server";

import { Card, CardSchema } from "@/types/Card";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getCardsOfProject({
  projectId,
}: {
  projectId: string | number;
}): Promise<Card[] | undefined> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/card/project/${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.map((card: Card) => CardSchema.parse(card));
  } catch (error) {
    console.error("Error in getCardsOfProject:", error);
    throw new Error("Failed to fetch cards of project");
  }
}
