import { signOut } from "next-auth/react";

async function KeycloakSessionSignOut() {
  try {
    const res = await fetch("/api/auth/logout");
    const data = await res.json();

    if (data.url) {
      // Redirecționează browserul către logout-ul Keycloak
      window.location.href = data.url;
    } else {
      console.warn("Logout URL not received. Staying on page.");
    }
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
