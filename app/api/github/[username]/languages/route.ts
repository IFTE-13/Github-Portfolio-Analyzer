import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "github-portfolio-analyzer",
      },
    });

    if (!reposRes.ok) {
      return NextResponse.json({ error: "Failed to fetch repos" }, { status: 404 });
    }

    const repos = await reposRes.json();
    const languageMap: Record<string, number> = {};

    for (const repo of repos) {
      const langRes = await fetch(repo.languages_url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "github-portfolio-analyzer",
        },
      });

      if (langRes.ok) {
        const languages = await langRes.json();
        Object.entries(languages).forEach(([lang, bytes]) => {
          languageMap[lang] = (languageMap[lang] || 0) + (bytes as number);
        });
      }
    }

    const languageData = Object.entries(languageMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return NextResponse.json(languageData);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch language data" },
      { status: 500 }
    );
  }
}