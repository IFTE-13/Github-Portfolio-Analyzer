import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "github-portfolio-analyzer",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = await response.json();
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
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}