import { NextResponse } from "next/server";
import { githubFetch } from "@/lib/github";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    const userData = await githubFetch<Record<string, unknown>>(
      `https://api.github.com/users/${username}`
    );

    return NextResponse.json({
      name: userData.name,
      login: userData.login,
      bio: userData.bio,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      avatar_url: userData.avatar_url,
      twitter_username: userData.twitter_username,
      html_url: userData.html_url,
      company: userData.company,
      location: userData.location,
      created_at: userData.created_at,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user data";
    const status = message.includes("rate limit") ? 429 : message.includes("404") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}