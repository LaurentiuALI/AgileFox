import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id_token?: string;
      access_token?: string;
      refresh_token?: string;
      expires_at?: number;
      error?: string;
      roles?: string[];
      username?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
    expires_at?: number;
    error?: string;
    client_id?: string;
    client_secret?: string;
    issuer?: string;
    refresh_token?: string;
    grant_type?: string;
    roles?: string[];
    username?: string;
  }
}
