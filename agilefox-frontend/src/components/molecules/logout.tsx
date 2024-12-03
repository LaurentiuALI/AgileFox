// "use client";
import { signOut, useSession } from "next-auth/react";

async function KeycloakSessionSignOut() {
  try {
    await fetch("/api/auth/logout", { method: "GET" });
  } catch (err) {
    console.error("Error logging out", err);
  }
}

export default function Logout() {
  const { data: session } = useSession();

  return (
    <button
      onClick={async () => {
        await KeycloakSessionSignOut().then(() =>
          signOut({ callbackUrl: "/" })
        );
      }}
    >
      Signed in as {session?.user?.email}
      Logout from Keycloaks?
    </button>
  );
}
