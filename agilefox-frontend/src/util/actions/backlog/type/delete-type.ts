"use server";

import { getAccessToken } from "@/util/SessionTokenAccesor";

export async function deleteType({ typeId }: { typeId: number | string }): Promise<boolean> {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        console.error(
            "[deleteType] User is not authenticated or token is missing."
        );
        throw new Error("Authentication required. Please log in.");
    }

    try {
        const response = await fetch(
            `${process.env.BACKEND_URL}/type/${typeId}`,
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
                `[deleteType] Failed to delete type. Status: ${response.status}, Message: ${response.statusText}`
            );
            throw new Error("Failed to delete type.");
        }

        console.log("[deleteType] Type deleted successfully.");
        return true;
    } catch (error) {
        console.error(
            "[deleteType] Error occurred while deleting type:",
            error
        );
        return false;
    }
}
