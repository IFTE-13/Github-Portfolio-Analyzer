"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
}

interface RepoListProps {
  repos: GitHubRepo[];
  sortBy: "stars" | "forks" | "name";
  setSortBy: (value: "stars" | "forks" | "name") => void;
}

export function RepoList({ repos, sortBy, setSortBy }: RepoListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(6);

  // Sort repos
  const sortedRepos = [...repos].sort((a, b) => {
    if (sortBy === "stars") return b.stars - a.stars;
    if (sortBy === "forks") return b.forks - a.forks;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedRepos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const currentRepos = sortedRepos.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-tomorrow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground">Repositories ({repos.length})</h3>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort" className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="forks">Forks</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={reposPerPage.toString()}
              onValueChange={(value) => {
                setReposPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id="page-size" className="w-full sm:w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {repos.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRepos.map((repo) => (
              <Card key={repo.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={repo.url}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      {repo.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex gap-4 text-sm">
                    <span>⭐ {repo.stars}</span>
                    <span>🍴 {repo.forks}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-justify">
                    {repo.description || "No description"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-muted-foreground">No repositories found.</p>
      )}
    </div>
  );
}