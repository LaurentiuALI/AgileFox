"use client";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toggleMode";
import Login from "./login";
import Logout from "./logout";
import { useSession } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="w-full h-20 flex justify-between bg-containerBackground relative md:h-28">
      <Link href="/" passHref>
        <div className="w-20 h-20 relative  md:h-28 md:w-28">
          <Image
            src="/images/Fox Scrum Logo.svg"
            alt="Picture of the author"
            objectFit="cover"
            fill
            className="p-2"
          />
        </div>
      </Link>
      {!session ? <Login /> : <Logout />}
      <ModeToggle />
    </nav>
  );
}
