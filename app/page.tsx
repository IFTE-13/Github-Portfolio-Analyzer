"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/app/_components/hero";
import { UserProfile } from "@/app/_components/userProfile";
import { RepoList } from "@/app/_components/repoList";
import { LanguageChart } from "@/app/_components/languageChart";
import { InsightsPanel } from "@/app/_components/insightsPanel";
import { TopRepos } from "@/app/_components/topRepos";
import type { GitHubUser, GitHubRepo, Language } from "@/lib/types";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState<"stars" | "forks" | "name">("stars");

  // Reusable search function
  const executeSearch = useCallback(async (targetUser: string) => {
    const nameToSearch = targetUser.trim();
    if (!nameToSearch) return;

    setError(null);
    setUserData(null);
    setRepos([]);
    setLanguages([]);
    setIsLoading(true);
    setHasSearched(true);

    try {
      // Fetch user data first
      const userResponse = await fetch(`/api/github/${nameToSearch}`);
      if (!userResponse.ok) {
        const userError = await userResponse.json();
        setError(userError.error || "Failed to fetch user data");
        return;
      }
      const userData: GitHubUser = await userResponse.json();
      setUserData(userData);

      // Fetch repos and languages in parallel
      const [reposResponse, langResponse] = await Promise.all([
        fetch(`/api/github/${nameToSearch}/repos`),
        fetch(`/api/github/${nameToSearch}/languages`),
      ]);

      if (reposResponse.ok) {
        const reposData: GitHubRepo[] = await reposResponse.json();
        setRepos(reposData);
      } else {
        const repoError = await reposResponse.json();
        setError(repoError.error || "Failed to fetch repositories");
      }

      if (langResponse.ok) {
        const langData: Language[] = await langResponse.json();
        setLanguages(langData);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      executeSearch(username);
    },
    [username, executeSearch]
  );

  // Load "octocat" by default on initial mount
  useEffect(() => {
    executeSearch("octocat");
    setUsername("octocat");
  }, [executeSearch]);

  return (
    <main className="min-h-screen bg-background bg-grid pb-20">
      {/* Hero / Search */}
      <Header
        username={username}
        setUsername={setUsername}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 animate-fade-in-up">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground font-sans">
            Scanning portfolio for <span className="font-semibold text-foreground">{username}</span>...
          </p>
        </div>
      )}

      {/* Content Sections */}
      {!isLoading && (
        <div className="flex flex-col gap-8">
          {/* User Profile + Error */}
          <UserProfile userData={userData} error={error} hasSearched={hasSearched} />

          {/* Data sections — only show when we have data */}
          {userData && repos.length > 0 && (
            <>
              {/* Activity Insights */}
              <InsightsPanel repos={repos} languages={languages} />

              {/* Top Repositories */}
              <TopRepos repos={repos} />

              {/* Language Distribution */}
              {languages.length > 0 && (
                <div className="w-full max-w-6xl mx-auto px-4">
                  <LanguageChart languages={languages} />
                </div>
              )}

              {/* All Repositories */}
              <RepoList repos={repos} sortBy={sortBy} setSortBy={setSortBy} />
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8 text-center text-xs text-muted-foreground bg-card/20 font-sans">
        <p className="max-w-xl mx-auto px-4">
          Gitlytics Developer Intelligence Panel · Powered by Next.js & Tailwind CSS. Data provided by official{" "}
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            GitHub Developer REST API
          </a>.
        </p>
      </footer>
    </main>
  );
}