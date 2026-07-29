import { NextResponse } from "next/server";
import { githubFetchAllPages } from "@/lib/github";
import type { GitHubApiRepo } from "@/lib/types";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    const data = await githubFetchAllPages<GitHubApiRepo>(
      `https://api.github.com/users/${username}/repos`
    );

    const repos = data.map((repo) => ({
      name: repo.name,
      description: repo.description || "No description",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      language: repo.language,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      topics: repo.topics || [],
    }));

    return NextResponse.json(repos);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch repository data";
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
