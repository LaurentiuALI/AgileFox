"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function deleteState({ stateId }: { stateId: number | string }) {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        console.error(
            "[deleteState] User is not authenticated or token is missing."
        );
        throw new Error("Authentication required. Please log in.");
    }

    const response = await fetch(
        `${process.env.BACKEND_URL}/state/${stateId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        console.error(
            `[deleteState] Failed to delete state. Status: ${response.status}, Message: ${response.statusText}`
        );
        throw new Error(`Failed to delete state: ${response.statusText}`);
    }

    console.log("[deleteType] Type deleted successfully.");
}
