"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Twitter,
  Building,
  MapPin,
  BookOpen,
  Users,
  UserPlus,
  Calendar,
  AlertCircle,
  Briefcase,
  Layers,
} from "lucide-react";
import Link from "next/link";
import type { GitHubUser } from "@/lib/types";

interface UserProfileProps {
  userData: GitHubUser | null;
  error: string | null;
  hasSearched: boolean;
}

function getAccountAge(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const years = now.getFullYear() - created.getFullYear();
  const months = now.getMonth() - created.getMonth();
  const totalMonths = years * 12 + months;

  if (totalMonths < 1) return "Joined this month";
  if (totalMonths < 12) return `Member for ${totalMonths} mo${totalMonths > 1 ? "s" : ""}`;
  const yrs = Math.floor(totalMonths / 12);
  const mos = totalMonths % 12;
  if (mos === 0) return `Member for ${yrs} yr${yrs > 1 ? "s" : ""}`;
  return `Member for ${yrs} yr${yrs > 1 ? "s" : ""} ${mos} mo${mos > 1 ? "s" : ""}`;
}

export function UserProfile({ userData, error, hasSearched }: UserProfileProps) {
  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 animate-fade-in-up">
        <Card className="border-destructive/30 bg-destructive/5 cyber-glow">
          <CardContent className="flex items-center gap-3.5 py-5 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-destructive font-display">Analysis Error</h4>
              <p className="text-destructive/80 text-xs mt-0.5 font-sans">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const stats = [
    { title: "Public Repositories", value: userData.public_repos, icon: BookOpen, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { title: "Total Followers", value: userData.followers, icon: Users, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { title: "Total Following", value: userData.following, icon: UserPlus, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  ];

  const profileDetails = [
    {
      label: "GitHub Link",
      value: `@${userData.login}`,
      icon: Github,
      href: userData.html_url,
    },
    {
      label: "Twitter / X",
      value: userData.twitter_username ? `@${userData.twitter_username}` : null,
      icon: Twitter,
      href: userData.twitter_username
        ? `https://twitter.com/${userData.twitter_username}`
        : null,
    },
    {
      label: "Organization",
      value: userData.company,
      icon: Building,
    },
    {
      label: "Location Address",
      value: userData.location,
      icon: MapPin,
    },
    {
      label: "Tenure Period",
      value: userData.created_at ? getAccountAge(userData.created_at) : null,
      icon: Calendar,
    },
  ].filter((detail) => detail.value);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-5 animate-fade-in-up">
      {/* Profile Card */}
      <Card className="overflow-hidden border-border/50 bg-card/60 backdrop-blur-md cyber-glow">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar & Identity info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 flex-1 min-w-0">
              <div className="relative shrink-0">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-primary to-cyan-400 opacity-60 blur-md animate-pulse-soft" />
                <Image
                  src={userData.avatar_url}
                  alt={`${userData.login}'s avatar`}
                  width={96}
                  height={96}
                  className="relative rounded-full border-2 border-background shadow-xl scale-95"
                />
              </div>
              <div className="space-y-2 min-w-0">
                <div>
                  <h2 className="text-3xl font-extrabold text-foreground tracking-tight font-display">
                    {userData.name || userData.login}
                  </h2>
                  {userData.name && (
                    <p className="text-sm font-medium text-primary mt-0.5 font-display">
                      @{userData.login}
                    </p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md font-sans">
                  {userData.bio || "No bio available for this developer profile."}
                </p>
              </div>
            </div>

            {/* Profile Detail Grid */}
            {profileDetails.length > 0 && (
              <div className="w-full md:w-auto shrink-0 md:max-w-xs border-t md:border-t-0 md:border-l border-border/30 pt-6 md:pt-0 md:pl-8">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 text-center md:text-left font-display">
                  Profile Details
                </h4>
                <div className="space-y-3 font-sans">
                  {profileDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex items-center gap-3 text-sm justify-start"
                    >
                      {/* Styled Mini Icon */}
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/40 bg-secondary/50 text-muted-foreground shrink-0 shadow-xs">
                        <detail.icon className="h-3.5 w-3.5" />
                      </div>
                      {detail.href ? (
                        <Link
                          href={detail.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-foreground hover:bg-primary/10 px-2 py-0.5 rounded-md font-semibold transition-all truncate"
                        >
                          {detail.value}
                        </Link>
                      ) : (
                        <span className="text-foreground font-semibold truncate px-2">
                          {detail.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-border/40 bg-card/40 backdrop-blur-xs cyber-glow hover:bg-card/75 transition-all duration-300 group"
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-display">
                  {stat.title}
                </p>
                <p className="text-3xl font-extrabold text-foreground font-display tabular-nums group-hover:scale-105 transition-transform origin-left">
                  {stat.value.toLocaleString()}
                </p>
              </div>
              {/* Premium Icon badge */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${stat.color} shrink-0 shadow-md group-hover:rotate-6 transition-transform`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}