"use server";

import { Project } from "@/types/Project";
import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function getAllProjects(): Promise<Project[]> {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const response = await fetch(`${process.env.BACKEND_URL}/project`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects", error);
    throw error;
  }
}
