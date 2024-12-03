import { getIdToken } from "@/util/SessionTokenAccesor";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  if (session) {
    const idToken = await getIdToken();

    const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;

    try {
      await fetch(url, { method: "GET" });
    } catch (err) {
      console.error("Error during Keycloak logout:", err);
      return new Response("Error during Keycloak logout", { status: 500 });
    }
  }
  return new Response("Logged out", { status: 200 });
}
