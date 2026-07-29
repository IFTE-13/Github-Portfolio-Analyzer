"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, GitFork, Code, TrendingUp, Calendar, Flame } from "lucide-react";
import type { GitHubRepo, Language } from "@/lib/types";

interface InsightsPanelProps {
  repos: GitHubRepo[];
  languages: Language[];
}

export function InsightsPanel({ repos, languages }: InsightsPanelProps) {
  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks, 0);
  const avgStars = repos.length > 0 ? (totalStars / repos.length).toFixed(1) : "0";
  const topLanguage = languages.length > 0 ? languages[0].name : "—";

  // Most recently updated repo
  const sortedByDate = [...repos].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
  const recentRepo = sortedByDate[0];

  // Unique languages count
  const uniqueLangs = new Set(repos.map((r) => r.language).filter(Boolean)).size;

  const insights = [
    {
      label: "Total Stars Received",
      value: totalStars.toLocaleString(),
      icon: Star,
      color: "text-amber-400 border-amber-500/25 bg-amber-500/10",
    },
    {
      label: "Total Fork Count",
      value: totalForks.toLocaleString(),
      icon: GitFork,
      color: "text-cyan-400 border-cyan-500/25 bg-cyan-500/10",
    },
    {
      label: "Average Stars/Repo",
      value: avgStars,
      icon: TrendingUp,
      color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10",
    },
    {
      label: "Primary Language",
      value: topLanguage,
      icon: Code,
      color: "text-purple-400 border-purple-500/25 bg-purple-500/10",
    },
    {
      label: "Languages Mastered",
      value: uniqueLangs.toString(),
      icon: Flame,
      color: "text-rose-400 border-rose-500/25 bg-rose-500/10",
    },
    {
      label: "Last Repository Sync",
      value: recentRepo
        ? new Date(recentRepo.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
        : "—",
      icon: Calendar,
      color: "text-blue-400 border-blue-500/25 bg-blue-500/10",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
      <h3 className="text-xl font-bold tracking-tight text-foreground mb-4 font-display">
        Developer Insights
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {insights.map((item) => (
          <Card
            key={item.label}
            className="border-border/40 bg-card/40 backdrop-blur-xs cyber-glow hover:bg-card/75 transition-all duration-300 group"
          >
            <CardContent className="p-5 flex flex-col items-center text-center">
              {/* Premium Icon Badge */}
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.color} shrink-0 mb-3.5 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1 h-8 font-sans">
                {item.label}
              </p>
              <p className="text-2xl font-extrabold text-foreground font-display tabular-nums tracking-tight">
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
