"use client";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toggleMode";
import Authentication from "./authentication";
import BacklogToolbar from "./backlogToolbar";

export default function Navigation() {
  return (
    <nav className="w-full h-20 flex justify-between items-center bg-containerBackground relative md:h-28">
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
      <BacklogToolbar />
      <Authentication />
      <ModeToggle />
    </nav>
  );
}
