import Image from "next/image";
import Link from "next/link";
import BacklogToolbar from "./backlogToolbar";
import Profile from "./profile";

export default function Navigation() {
  return (
    <nav className="w-full h-20 flex items-center bg-containerBackground relative md:h-28">
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
      <div className="flex justify-end items-center gap-20 w-full">
        <BacklogToolbar />
        <Profile />
      </div>
    </nav>
  );
}
