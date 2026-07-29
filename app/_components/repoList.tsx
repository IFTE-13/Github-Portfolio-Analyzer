"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star, GitFork, ExternalLink, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import type { GitHubRepo } from "@/lib/types";

interface RepoListProps {
  repos: GitHubRepo[];
  sortBy: "stars" | "forks" | "name";
  setSortBy: (value: "stars" | "forks" | "name") => void;
}

export function RepoList({ repos, sortBy, setSortBy }: RepoListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(6);

  const sortedRepos = [...repos].sort((a, b) => {
    if (sortBy === "stars") return b.stars - a.stars;
    if (sortBy === "forks") return b.forks - a.forks;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedRepos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const currentRepos = sortedRepos.slice(startIndex, startIndex + reposPerPage);

  return (
    <div key={`${sortBy}-${reposPerPage}`} className="w-full max-w-6xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground tracking-tight font-display">
            All Repositories
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-sans">
            Total {repos.length} codebases analyzed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                id="sort-select"
                className="w-32 h-9 rounded-lg bg-card/40 border-border/40 text-xs font-semibold font-sans focus:ring-primary/20"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="forks">Forks</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select
            value={reposPerPage.toString()}
            onValueChange={(value) => setReposPerPage(Number(value))}
          >
            <SelectTrigger
              id="page-size-select"
              className="w-20 h-9 rounded-lg bg-card/40 border-border/40 text-xs font-semibold font-sans focus:ring-primary/20"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {repos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRepos.map((repo) => (
              <Card
                key={repo.name}
                className="group flex flex-col border-border/40 bg-card/40 backdrop-blur-xs cyber-glow hover:bg-card/75 transition-all duration-300"
              >
                <CardContent className="flex flex-col flex-1 p-5">
                  {/* Repo Name */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <Link
                      href={repo.url}
                      target="_blank"
                      className="text-sm font-bold text-foreground hover:text-primary transition-colors truncate font-display"
                    >
                      {repo.name}
                    </Link>
                    <Link
                      href={repo.url}
                      target="_blank"
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-border/30 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2 mb-4 font-sans">
                    {repo.description || "No description provided."}
                  </p>

                  {/* Footer: language + stats */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-border/20 mt-auto">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-lg border-border/40 bg-card/40"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 rounded-lg text-xs font-bold font-display ${
                      currentPage === pageNum
                        ? "bg-primary text-primary-foreground"
                        : "border-border/40 bg-card/40"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded-lg border-border/40 bg-card/40"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-sm text-muted-foreground py-8">
          No repositories found.
        </p>
      )}
    </div>
  );
}

// Inline language color lookup (matches the shared utility)
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
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function getLanguageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || "#8b8b8b";
}