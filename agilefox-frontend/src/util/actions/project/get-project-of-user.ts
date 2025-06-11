"use server";

import { Project } from "@/types/Project";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getProjectOfUser({
  username,
}: {
  username: string;
}): Promise<Project[]> {
  console.log("🚀 ~ username:", username)
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/project/user?username=${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("🚀 ~ response:", await response.json())

    if (!response.ok) {
      throw new Error(
        `Failed to fetch projects of user: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects of user", error);
    throw error;
  }
}
