"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, GitFork, ExternalLink, Award } from "lucide-react";
import Link from "next/link";
import type { GitHubRepo } from "@/lib/types";

interface TopReposProps {
  repos: GitHubRepo[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function getLanguageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || "#8b8b8b";
}

export function TopRepos({ repos }: TopReposProps) {
  const topRepos = [...repos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 3);

  if (topRepos.length === 0) return null;

  const medals = ["#fbbf24", "#94a3b8", "#b45309"]; // Gold, Silver, Bronze border colors
  const rankNames = ["Primary Star", "Secondary Star", "Tertiary Star"];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
      <h3 className="text-xl font-bold text-foreground tracking-tight mb-4 font-display">Top Repositories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {topRepos.map((repo, index) => (
          <Card
            key={repo.name}
            className="group relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-xs cyber-glow hover:bg-card/75 transition-all duration-300"
          >
            <CardContent className="p-5 flex flex-col h-full justify-between">
              <div>
                {/* Header Rank Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold shrink-0 shadow-xs"
                      style={{
                        borderColor: medals[index],
                        color: medals[index],
                        backgroundColor: `${medals[index]}10`,
                      }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-sans">
                      {rankNames[index]}
                    </span>
                  </div>
                  <Link
                    href={repo.url}
                    target="_blank"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/30 bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all shrink-0"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Repo Title */}
                <h4 className="text-base font-bold text-foreground font-display mb-2 group-hover:text-primary transition-colors truncate">
                  {repo.name}
                </h4>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed font-sans line-clamp-3 mb-6">
                  {repo.description || "No description provided."}
                </p>
              </div>

              {/* Footer details */}
              <div className="flex items-center justify-between pt-3.5 border-t border-border/20 mt-auto">
                {repo.language ? (
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground font-sans">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    {repo.language}
                  </span>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground font-sans">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="tabular-nums">{repo.stars.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <GitFork className="h-3.5 w-3.5 shrink-0" />
                    <span className="tabular-nums">{repo.forks.toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
