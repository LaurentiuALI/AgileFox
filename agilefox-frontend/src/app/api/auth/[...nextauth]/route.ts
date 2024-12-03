import { encrypt } from "@/util/encrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

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
        console.log("Token expired");
      }
      return token;
    },
    async session({ session, token }) {
      session.user.access_token = encrypt(token.access_token as string);
      session.user.id_token = encrypt(token.id_token as string);

      return session;
    },
  },
};

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };
