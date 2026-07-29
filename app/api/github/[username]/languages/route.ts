import { NextResponse } from "next/server";
import { githubFetchAllPages, githubFetch, getLanguageColor } from "@/lib/github";
import type { GitHubApiRepo } from "@/lib/types";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  try {
    const repos = await githubFetchAllPages<GitHubApiRepo>(
      `https://api.github.com/users/${username}/repos`
    );

    const languageMap: Record<string, number> = {};

    // Batch language fetches — max 5 concurrent to respect rate limits.
    // Only fetch from repos that have a languages_url (all should).
    const batchSize = 5;
    for (let i = 0; i < repos.length; i += batchSize) {
      const batch = repos.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map((repo) =>
          githubFetch<Record<string, number>>(repo.languages_url)
        )
      );

      for (const result of results) {
        if (result.status === "fulfilled") {
          for (const [lang, bytes] of Object.entries(result.value)) {
            languageMap[lang] = (languageMap[lang] || 0) + bytes;
          }
        }
      }
    }

    const totalBytes = Object.values(languageMap).reduce((sum, v) => sum + v, 0);

    const languageData = Object.entries(languageMap)
      .map(([name, value]) => ({
        name,
        value,
        percentage: totalBytes > 0 ? Math.round((value / totalBytes) * 1000) / 10 : 0,
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.value - a.value);

    return NextResponse.json(languageData);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch language data";
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}