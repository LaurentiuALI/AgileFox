"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Login from "./login";
import Logout from "./logout";

export default function Authentication() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      session.user.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  return !session ? <Login /> : <Logout />;
}
