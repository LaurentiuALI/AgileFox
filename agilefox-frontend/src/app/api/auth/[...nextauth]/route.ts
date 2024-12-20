import { encrypt } from "@/util/encrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";

async function refreshAccesToken(token: JWT): Promise<JWT> {
  const body = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
    refresh_token: token.refresh_token || "",
    grant_type: "refresh_token",
  });

  const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body, // Pass the properly formatted URLSearchParams here
    method: "POST",
  });

  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;
  return {
    ...token,
    acces_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: refreshToken.expires_in + Math.floor(Date.now() / 1000),
    refresh_token: refreshToken.refresh_token,
  };
}

export const AuthOption: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // account is available during signin
        // token.decoded = jwtDecode(account.accessToken)

        console.log("account:" + JSON.stringify(account, null, 2));

        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (token.expires_at && nowTimeStamp < token.expires_at) {
        // token is still valid
        return token;
      } else {
        console.log("Token expired. Will refresh...");
        try {
          const refreshedToken = await refreshAccesToken(token);
          console.log(
            "Refreshed token: " + JSON.stringify(refreshedToken, null, 2)
          );
          return refreshedToken;
        } catch (error) {
          console.error(
            "Error refreshing token: " + JSON.stringify(error, null, 2)
          );
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.access_token = encrypt(token.access_token as string);
      session.user.id_token = encrypt(token.id_token as string);
      session.user.error = token.error;

      return session;
    },
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };
