import { signOut } from "next-auth/react";

async function KeycloakSessionSignOut() {
  try {
    await fetch("/api/auth/logout", { method: "GET" });
  } catch (err) {
    console.error("Error logging out", err);
  }
}

export default function Logout() {
  return (
    <button
      onClick={async () => {
        await KeycloakSessionSignOut().then(() =>
          signOut({ callbackUrl: "/" })
        );
      }}
    >
      Logout from Keycloak
    </button>
  );
}
