"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps {
  className?: string;
}

export const AnimatedThemeToggler = ({
  className
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isClient) {
    return (
      <div className={cn("h-9 w-9 rounded-lg border border-border/40 bg-card/40 flex items-center justify-center text-muted-foreground", className)}>
        <Sun className="h-4 w-4 opacity-0" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-card/60 text-foreground backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-card/90 focus:outline-hidden",
        className
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Sun className="h-4 w-4 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Moon className="h-4 w-4 text-indigo-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
