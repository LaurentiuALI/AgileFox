import { getServerSession } from "next-auth";
import { AuthOption } from "@/app/api/auth/[...nextauth]/route";
import { decrypt } from "./encrypt";

export async function getAccessToken() {
  const session = await getServerSession(AuthOption);

  if (session && session.user.access_token !== undefined) {
    const accessTokenDecrypted = decrypt(session.user.access_token);
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken() {
  const session = await getServerSession(AuthOption);

  if (session && session.user.access_token !== undefined) {
    const idTokenDecrypted = decrypt(session.user.access_token);
    return idTokenDecrypted;
  }
  return null;
}
