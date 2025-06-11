"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export interface ISubmitBacklogItem {
  projectId: number;
  typeId: string;
  title: string;
  description: string;
  username?: string;
}
export async function submitBacklogItem(formData: ISubmitBacklogItem) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[submitBacklogItem] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  const response = await fetch(`${process.env.BACKEND_URL}/backlogitem/item`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    console.error(
      `[submitBacklogItem] Failed to submit backlog item. Status: ${response.status}, Message: ${response.statusText}`
    );
    const text = JSON.parse(await response.text());
    throw new Error(`Failed to submit backlog item: ${text.message}`);
  }

  console.log("[submitBacklogItem] Backlog item submitted successfully.");
} 
