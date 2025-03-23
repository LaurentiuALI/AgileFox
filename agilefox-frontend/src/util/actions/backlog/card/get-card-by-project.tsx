"use server";

import { Card, CardSchema } from "@/types/Card";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getCardsOfProject({
  projectId,
}: {
  projectId: string | number;
}): Promise<Card[] | undefined> {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/card/project/${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.map((card: Card) => CardSchema.parse(card)); // Validate and return the parsed object
  } catch (error) {
    console.error("Error in getCardsOfProject:", error);
    throw new Error("Failed to fetch cards of project");
  }
}
