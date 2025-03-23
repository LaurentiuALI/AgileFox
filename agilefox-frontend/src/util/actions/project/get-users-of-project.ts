"use server";

import { User } from "@/types/User";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getUsersOfProject({
  projectId,
}: {
  projectId: number;
}): Promise<User[]> {
  try {
    // Obține sesiunea și tokenul utilizatorului
    const idToken = await getIdToken();

    if (!idToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    // Fă cererea către backend
    const response = await fetch(
      `${process.env.BACKEND_URL}/project/user/${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch users of project: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users of project", error);
    throw error;
  }
}
