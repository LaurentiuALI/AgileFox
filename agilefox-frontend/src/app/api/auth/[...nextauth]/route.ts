import { encrypt } from "@/util/encrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const body = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
    refresh_token: token.refresh_token || "",
    grant_type: "refresh_token",
  });

  const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    method: "POST",
  });

  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  // Decode the new access token to get roles
  const decoded = jwtDecode(refreshToken.access_token);
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const roles =
    decoded.realm_access?.roles ||
    decoded.resource_access?.[clientId]?.roles ||
    [];

  return {
    ...token,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token ?? token.refresh_token,
    roles: roles, // Add roles to the token
  };
}

export const AuthOption: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // Decode access token on initial sign-in
        const decoded = jwtDecode(account.access_token!);
        const clientId = process.env.KEYCLOAK_CLIENT_ID;

        // Extract roles from either realm_access or resource_access
        const roles =
          decoded.realm_access?.roles ||
          decoded.resource_access?.[clientId]?.roles ||
          [];

        return {
          ...token,
          access_token: account.access_token,
          id_token: account.id_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          roles: roles, // Store roles in the token
        };
      } else if (token.expires_at && nowTimeStamp < token.expires_at) {
        // If the token is still valid, keep the existing roles
        return token;
      } else {
        // Refresh token and update roles
        try {
          const refreshedToken = await refreshAccessToken(token);
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing token:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      // Expose roles in the session
      session.user.access_token = encrypt(token.access_token as string);
      session.user.id_token = encrypt(token.id_token as string);
      session.user.roles = token.roles; // Add roles to the session
      session.user.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };
