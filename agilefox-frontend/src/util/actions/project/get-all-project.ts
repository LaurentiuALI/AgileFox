"use server";

import { Project } from "@/types/Project";
import { getIdToken } from "@/util/SessionTokenAccesor";

export async function getAllProjects(): Promise<Project[]> {
  try {
    // Obține sesiunea și tokenul utilizatorului
    const idToken = await getIdToken();

    if (!idToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    // Fă cererea către backend
    const response = await fetch(`${process.env.BACKEND_URL}/project`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
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
    return [];
  }
}
