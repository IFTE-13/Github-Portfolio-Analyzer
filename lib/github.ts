// Centralized GitHub API utility with caching, auth, and pagination

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  // Prevent unbounded cache growth
  if (cache.size > 500) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }
  cache.set(key, { data, timestamp: Date.now() });
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "github-portfolio-analyzer",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function githubFetch<T>(url: string): Promise<T> {
  const cached = getCached<T>(url);
  if (cached) return cached;

  const response = await fetch(url, { headers: getHeaders() });

  if (response.status === 403) {
    const rateLimitReset = response.headers.get("X-RateLimit-Reset");
    const resetTime = rateLimitReset
      ? new Date(parseInt(rateLimitReset) * 1000).toISOString()
      : "unknown";
    throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  setCache(url, data);
  return data as T;
}

/**
 * Fetch all pages of a paginated GitHub API endpoint.
 * GitHub defaults to 30 per page; we request 100 (max).
 */
export async function githubFetchAllPages<T>(baseUrl: string): Promise<T[]> {
  const cacheKey = `paginated:${baseUrl}`;
  const cached = getCached<T[]>(cacheKey);
  if (cached) return cached;

  const allItems: T[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const separator = baseUrl.includes("?") ? "&" : "?";
    const url = `${baseUrl}${separator}per_page=${perPage}&page=${page}`;
    const items = await githubFetch<T[]>(url);
    allItems.push(...items);

    if (items.length < perPage) break;
    page++;

    // Safety limit to prevent infinite loops
    if (page > 10) break;
  }

  setCache(cacheKey, allItems);
  return allItems;
}

/**
 * Official GitHub language colors for the chart.
 */
export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Lua: "#000080",
  R: "#198CE7",
  MATLAB: "#e16737",
  Julia: "#a270ba",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Erlang: "#B83998",
  "Objective-C": "#438eff",
  Perl: "#0298c3",
  "Vim script": "#199f4b",
  Makefile: "#427819",
  PowerShell: "#012456",
  TeX: "#3D6117",
  Dockerfile: "#384d54",
  HCL: "#844fba",
  Nix: "#7e7eff",
  Zig: "#ec915c",
  Assembly: "#6E4C13",
  Jupyter: "#DA5B0B",
};

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] || "#8b8b8b";
}
