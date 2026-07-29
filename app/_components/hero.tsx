"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Terminal, Zap, BarChart2, GitBranch } from "lucide-react";
import { FormEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface HeaderProps {
  username: string;
  setUsername: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export function Header({ username, setUsername, onSubmit, isLoading }: HeaderProps) {
  return (
    <header className="relative w-full mx-auto pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 overflow-hidden backdrop-blur-md">
      {/* Background Image — Clear, stunning abstract ribbon wave sphere */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="/hero_bg.png"
            alt="Abstract Ribbon Wave Atmosphere"
            fill
            priority
            className="object-cover object-center opacity-70 dark:opacity-60 filter contrast-[1.1] saturate-[1.1]"
          />
        </motion.div>
        {/* Soft edge Vignette Overlay for clean text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--color-background)_90%)]" />
      </div>

      <div className="text-center space-y-7 max-w-3xl mx-auto relative z-10">
        {/* Hero Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] font-display"
        >
          <span className="text-foreground">Decode Any </span>
          <span className="gradient-text drop-shadow-[0_4px_25px_rgba(168,85,247,0.35)]">
            GitHub
          </span>
          <br />
          <span className="text-foreground">Developer Story</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-sans font-medium"
        >
          Visualize repositories, compute language distributions, and explore development activity insights with a sleek developer intelligence board.
        </motion.p>

        {/* Search Bar Container */}
        <motion.form
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          onSubmit={onSubmit}
          className="flex items-center gap-2.5 max-w-xl mx-auto mt-8 p-2 rounded-2xl border border-primary/30 bg-card/75 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_35px_rgba(168,85,247,0.15)] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 transition-all"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="username-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username (e.g., octocat)..."
              className="pl-12 h-12 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0 rounded-none w-full font-sans text-foreground placeholder:text-muted-foreground/70"
            />
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="h-12 px-7 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 shrink-0 font-display tracking-wide"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Terminal className="h-4 w-4" />
                  <span>Analyze</span>
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Clean Feature Tag Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-muted-foreground font-sans"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-xs">
            <Zap className="h-3.5 w-3.5 text-amber-400" /> Instant Insights
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-xs">
            <BarChart2 className="h-3.5 w-3.5 text-cyan-400" /> Language Metrics
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-xs">
            <GitBranch className="h-3.5 w-3.5 text-purple-400" /> Paginated Repos
          </span>
        </motion.div>
      </div>
    </header>
  );
}