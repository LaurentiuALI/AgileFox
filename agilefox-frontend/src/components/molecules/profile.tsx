"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Login from "./login";
import Logout from "./logout";
import { ModeToggle } from "./toggleMode";

export default function Profile() {
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-12 h-12 bg-gray-500 rounded-full text-center content-center text-xl">
          {session?.user.name
            ? session?.user.name.split(" ")[0][0] +
              session?.user.name.split(" ")[1][0]
            : "A"}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>{!session ? <Login /> : <Logout />}</DropdownMenuItem>

        <DropdownMenuItem>
          <ModeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    //   <div className="w-12 h-12 bg-gray-500 rounded-full"></div>)
  );
}
