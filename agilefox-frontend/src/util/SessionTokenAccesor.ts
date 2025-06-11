import { getServerSession } from "next-auth";
import { AuthOption } from "@/lib/nextAuthOption";
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

  if (session && session.user.id_token !== undefined) {
    const idTokenDecrypted = decrypt(session.user.id_token);
    return idTokenDecrypted;
  }
  return null;
}
