import { getIdToken } from "@/util/SessionTokenAccesor";
import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/nextAuthOption";

export async function GET() {
  const session = await getServerSession(AuthOption);

  if (!session) {
    return Response.json({ url: "/" });
  }

  const idToken = await getIdToken();
  console.log("🚀 ~ GET ~ idToken:", idToken)
  const logoutUrl = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;

  return Response.json({ url: logoutUrl });
}
