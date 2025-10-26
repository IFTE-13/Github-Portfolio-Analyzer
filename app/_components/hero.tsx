"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

interface HeaderProps {
  username: string;
  setUsername: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function Header({ username, setUsername, onSubmit }: HeaderProps) {
  return (
    <header className="w-full max-w-5xl mx-auto my-4">
      <h1 className="text-3xl md:text-4xl font-bold text-start mb-6 text-foreground">
        GitHub Portfolio Analyzer
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label htmlFor="username" className="text-lg font-medium">
          Enter GitHub Username:
        </label>
        <div className="flex gap-2">
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., octocat"
            className="flex-1"
          />
          <Button type="submit" className="px-6">
            Analyze
          </Button>
        </div>
      </form>
    </header>
  );
}