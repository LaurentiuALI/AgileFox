"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function postProject({
  name,
  description,
  estimationType,
  abbrev,
}: {
  name: string;
  description: string;
  estimationType: string;
  abbrev: string;
}) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error(
      "[postProject] User is not authenticated or token is missing."
    );
    throw new Error("Authentication required. Please log in.");
  }

  if (!name || !description || !estimationType || !abbrev) {
    console.error(
      "[postProject] Missing required project details. Please provide all fields."
    );
    throw new Error("All fields are required.");
  }

  const response = await fetch(`${process.env.BACKEND_URL}/project`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      description: description,
      estimation_type: estimationType,
      abbrev: abbrev,
    }),
  });

  if (!response.ok) {
    console.error(
      `[postProject] Failed to submit project. Status: ${response.status}, Message: ${response.statusText}`
    );
    throw new Error("Failed to create project.");
  }

  console.log("[postProject] Project submitted successfully.");
}
