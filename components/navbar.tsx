import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";


export function Navbar() {
  return (
    <header className="w-full mx-auto flex max-w-5xl p-4 md:px-0 items-center justify-between">
        <Button variant="outline" asChild className="gap-2">
          <Link href={`https://github.com/github-profile-analyzer`} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
          </Link>
        </Button>
      <AnimatedThemeToggler />
    </header>
  );
}