import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id_token?: string;
      access_token?: string;
      refresh_token?: string;
      expires_at?: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
    expires_at?: number;
  }
}
