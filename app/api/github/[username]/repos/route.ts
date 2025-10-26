import { NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "github-portfolio-analyzer",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch repositories" },
        { status: response.status }
      );
    }

    const data: GitHubRepo[] = await response.json();

    const repos = data.map((repo) => ({
      name: repo.name,
      description: repo.description || "No description",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
    }));

    return NextResponse.json(repos);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch repository data" },
      { status: 500 }
    );
  }
}
