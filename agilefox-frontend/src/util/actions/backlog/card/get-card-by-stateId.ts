"use server";

import { Card, CardSchema } from "@/types/Card";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getCardByStateId({
  stateId,
}: {
  stateId: number | undefined;
}): Promise<Card[] | undefined> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/card/state/${stateId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching card:", response.statusText);
      return undefined;
    }

    const data = await response.json();
    return data.map((card: Card) => CardSchema.parse(card)); // Validate and return the parsed object
  } catch (error) {
    console.error("Error in getCardByStateId:", error);
    return undefined;
  }
}
