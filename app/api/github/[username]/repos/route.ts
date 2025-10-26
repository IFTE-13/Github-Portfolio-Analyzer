import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }  // Fixed: params is now a Promise
) {
  const { username } = await context.params;  // Fixed: await the params Promise

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "github-portfolio-analyzer",  // Added: prevents rate limiting
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch repositories" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const repos = data.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "No description",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
    }));

    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch repository data" },
      { status: 500 }
    );
  }
}