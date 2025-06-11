"use server";

import { User } from "@/types/User";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getAllUsers(): Promise<User[]> {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const response = await fetch(`${process.env.BACKEND_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
}
