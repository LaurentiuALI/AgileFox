"use server";

import { Project } from "@/types/Project";

export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/project`);
    const data = await response.json();
    console.log("🚀 ~ getAllProjects ~ data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching projects", error);
    return [];
  }
}
