import {
  NavigationMenu,
} from "@/components/ui/navigation-menu";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toggleMode";

export default function Navigation() {
  return (
    <nav className="flex justify-between bg-containerBackground p-4">
      <Link href="/" passHref>
        <Image
          src="/images/Fox Scrum Logo.svg"
          alt="Picture of the author"
          width={100}
          height={500}
          className="mx-8"
        />
      </Link>
      <NavigationMenu>
        <ModeToggle />
      </NavigationMenu>
    </nav>
  );
}
