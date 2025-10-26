"use client";

import { useState } from "react";
import { Header } from "@/app/_components/hero";
import { UserProfile } from "@/app/_components/userProfile";
import { RepoList } from "@/app/_components/repoList";
import { LanguageBarChart } from "@/app/_components/languageChart";

interface GitHubUser {
  name: string | null;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  twitter_username: string | null;
  html_url: string;
  company: string | null;
  location: string | null;
}

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
}

interface Language {
  name: string;
  value: number;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"stars" | "forks" | "name">("stars");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setError(null);
    setUserData(null);
    setRepos([]);
    setLanguages([]);

    try {
      const userResponse = await fetch(`/api/github/${username}`);
      if (!userResponse.ok) {
        const userError = await userResponse.json();
        setError(userError.error || "Failed to fetch user data");
        return;
      }
      const userData: GitHubUser = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(`/api/github/${username}/repos`);
      if (!reposResponse.ok) {
        const repoError = await reposResponse.json();
        setError(repoError.error || "Failed to fetch repositories");
        return;
      }
      const reposData: GitHubRepo[] = await reposResponse.json();
      setRepos(reposData);

      const langResponse = await fetch(`/api/github/${username}/languages`);
      if (langResponse.ok) {
        const langData: Language[] = await langResponse.json();
        setLanguages(langData);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <main className="min-h-screen flex flex-col items-center gap-8 p-4 bg-background font-tomorrow">
        <Header username={username} setUsername={setUsername} onSubmit={handleSubmit} />
        <UserProfile userData={userData} error={error} />
        {userData && (
          <>
            <RepoList repos={repos} sortBy={sortBy} setSortBy={setSortBy} />
            {languages.length > 0 && <LanguageBarChart languages={languages} />}
          </>
        )}
      </main>
    </>
  );
}