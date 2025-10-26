import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Twitter, Building, MapPin } from "lucide-react";
import Link from "next/link";

interface GitHubUser {
  name: string | null;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  twitter_username: string | null;
  html_url: string;
  company: string | null;
  location: string | null;
}

interface UserProfileProps {
  userData: GitHubUser | null;
  error: string | null;
}

export function UserProfile({ userData, error }: UserProfileProps) {
  if (error) {
    return (
      <div className="text-destructive text-center p-4 font-tomorrow">{error}</div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center p-4 font-tomorrow">Enter a username to analyze.</div>
    );
  }

  const stats = [
    { title: "Repositories", value: userData.public_repos },
    { title: "Followers", value: userData.followers },
    { title: "Following", value: userData.following },
  ];

  const profileDetails = [
    {
      label: "GitHub",
      value: userData.login,
      icon: Github,
      href: userData.html_url,
    },
    {
      label: "Twitter",
      value: userData.twitter_username ? `@${userData.twitter_username}` : null,
      icon: Twitter,
      href: userData.twitter_username ? `https://twitter.com/${userData.twitter_username}` : null,
    },
    {
      label: "Company",
      value: userData.company,
      icon: Building,
    },
    {
      label: "Location",
      value: userData.location,
      icon: MapPin,
    },
  ].filter((detail) => detail.value);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="bg-card rounded-lg shadow p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          <div className="flex items-center gap-4">
            <Image
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              width={96}
              height={96}
              className="rounded-full border-2 border-border"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold font-tomorrow text-foreground">
                {userData.name || userData.login}
              </h2>
              <p className="text-base text-muted-foreground font-tomorrow">
                {userData.bio || "No bio available"}
              </p>
            </div>
          </div>
          {profileDetails.length > 0 && (
            <div className="flex-1 border-border pl-0 md:pl-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-tomorrow">
                {profileDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-center gap-3 py-2 hover:bg-accent/50 rounded-md px-2 transition-colors"
                  >
                    <detail.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                    {detail.href ? (
                      <Link
                        href={detail.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-base font-medium"
                      >
                        {detail.value}
                      </Link>
                    ) : (
                      <span className="text-foreground text-base font-medium">
                        {detail.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-tomorrow">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <CardContent className="p-0 text-center">
              <p className="text-lg font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}