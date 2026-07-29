"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-foreground font-display">
            Git<span className="gradient-text">lytics</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/IFTE-13/Github-Portfolio-Analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground hover:bg-card"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">View source on GitHub</span>
          </Link>
          <AnimatedThemeToggler />
        </div>
      </div>
    </header>
  );
}