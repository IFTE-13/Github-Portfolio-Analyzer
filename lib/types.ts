// Shared TypeScript interfaces for the GitHub Portfolio Analyzer

export interface GitHubUser {
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
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
}

export interface Language {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

// GitHub API raw response types (before transformation)
export interface GitHubApiRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics?: string[];
  languages_url: string;
}
