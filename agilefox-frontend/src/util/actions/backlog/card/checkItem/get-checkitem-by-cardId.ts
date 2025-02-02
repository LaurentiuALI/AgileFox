"use server";

import { CheckItem, CheckItemSchema } from "@/types/CheckItem";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getCheckItemByCardId({
  cardId,
}: {
  cardId: number;
}): Promise<CheckItem[] | undefined> {
  const idToken = await getIdToken();

  if (!idToken) {
    throw new Error("User is not authenticated or token is missing");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/checkitem/card/${cardId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching checkitem:", response.statusText);
      return undefined;
    }

    const data = await response.json();
    return data.map((card: CheckItem) => CheckItemSchema.parse(card)); // Validate and return the parsed object
  } catch (error) {
    console.error("Error in getCheckItemByCardId:", error);
    return undefined;
  }
}
