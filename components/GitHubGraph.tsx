"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GITHUB_USERNAME } from "@/lib/constants";
import {
  fetchGithubActivityPayload,
  GithubActivityDay,
  GithubActivityItem,
  GithubActivitySummary,
  GithubRepo,
} from "@/lib/github";

const RECENT_REPOS_API_URL =
  "https://api.github.com/users/albanbyamugisha/repos?sort=updated&per_page=6&type=owner";

const GitHubGraph = () => {
  const [activity, setActivity] = useState<GithubActivityDay[]>([]);
  const [summary, setSummary] = useState<GithubActivitySummary>({
    commits: 0,
    pullRequests: 0,
    issues: 0,
  });
  const [recent, setRecent] = useState<GithubActivityItem[]>([]);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState<string | null>(null);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);

  const loadActivity = useCallback(async (signal?: AbortSignal) => {
    setActivityLoading(true);
    setActivityError(null);

    try {
      const payload = await fetchGithubActivityPayload(GITHUB_USERNAME, 84);
      if (signal?.aborted) return;
      setActivity(payload.daily);
      setSummary(payload.summary);
      setRecent(payload.recent);
      if (!payload.daily.length) {
        setActivityError("Live activity is currently unavailable.");
      }
    } catch {
      if (signal?.aborted) return;
      setActivity([]);
      setSummary({ commits: 0, pullRequests: 0, issues: 0 });
      setRecent([]);
      setActivityError("Unable to load live contribution activity.");
    } finally {
      if (!signal?.aborted) {
        setActivityLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadActivity(controller.signal);
    const interval = window.setInterval(() => {
      void loadActivity();
    }, 60_000);

    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [loadActivity]);

  const loadRepos = useCallback(async (signal?: AbortSignal) => {
    setReposLoading(true);
    setReposError(null);

    try {
      const response = await fetch(RECENT_REPOS_API_URL, {
        signal,
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("GitHub API rate limit reached. Please try again shortly.");
        }
        throw new Error("Unable to load repositories right now.");
      }

      const data = (await response.json()) as GithubRepo[];
      const normalized = data
        .filter((repo) => Boolean(repo?.html_url && repo?.name))
        .slice(0, 6);

      setRepos(normalized);
    } catch (error) {
      if (signal?.aborted) return;
      setRepos([]);
      setReposError(
        error instanceof Error
          ? error.message
          : "Unable to load repositories right now.",
      );
    } finally {
      if (!signal?.aborted) {
        setReposLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadRepos(controller.signal);
    return () => controller.abort();
  }, [loadRepos]);

  return (
    <section
      id="activity"
      className="mt-16 grid gap-8 scroll-mt-24 lg:grid-cols-[1.4fr_minmax(0,1fr)]"
    >
      <div className="glass-panel gold-border relative overflow-hidden rounded-3xl p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-100/80">
              Engineering Activity
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">
              Recent GitHub Contributions
            </h3>
          </div>
          <div className="text-[0.7rem] text-slate-400">@{GITHUB_USERNAME}</div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2 text-[0.65rem]">
          <div className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1.5">
            <p className="uppercase tracking-[0.15em] text-slate-400">Commits</p>
            <p className="mt-1 text-sm font-semibold text-emerald-300">
              {summary.commits}
            </p>
          </div>
          <div className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1.5">
            <p className="uppercase tracking-[0.15em] text-slate-400">PRs</p>
            <p className="mt-1 text-sm font-semibold text-cyan-300">
              {summary.pullRequests}
            </p>
          </div>
          <div className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1.5">
            <p className="uppercase tracking-[0.15em] text-slate-400">Issues</p>
            <p className="mt-1 text-sm font-semibold text-amber-300">
              {summary.issues}
            </p>
          </div>
        </div>
        <div className="mt-2">
          {activityLoading ? (
            <p className="text-xs text-slate-400">Loading live activity...</p>
          ) : activityError ? (
            <p className="text-xs text-slate-400">
              {activityError}
            </p>
          ) : (
            <div className="overflow-x-auto pb-2">
              <div className="inline-grid grid-flow-col grid-rows-7 gap-1 pr-1">
                {activity.map((day, index) => {
                  const intensity = Math.min(day.count / 8, 1);
                  const bgClass =
                    day.count === 0
                      ? "bg-slate-800/70"
                      : intensity < 0.3
                        ? "bg-emerald-950"
                        : intensity < 0.55
                          ? "bg-emerald-800"
                          : intensity < 0.8
                            ? "bg-emerald-600"
                            : "bg-emerald-400";

                  return (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.18,
                        delay: Math.min(index * 0.005, 0.4),
                        ease: [0.19, 1, 0.22, 1] as const,
                      }}
                      className={`h-3 w-3 rounded-[2px] ${bgClass} ring-1 ring-black/10`}
                      title={`${day.date}: ${day.count} activities`}
                      aria-label={`${day.date}: ${day.count} activities`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-xs leading-relaxed text-slate-300">
            Live public activity stream from GitHub for commits, pull requests, and issues.
          </p>
          {!activityLoading && recent.length > 0 && (
            <ul className="space-y-1.5 text-[0.68rem] text-slate-300">
              {recent.slice(0, 4).map((item) => (
                <li key={item.id} className="rounded-lg border border-slate-700/70 bg-slate-900/60 px-2 py-1.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 hover:text-amber-200"
                  >
                    <span className="min-w-0 truncate">
                      <span className="mr-1 uppercase tracking-[0.12em] text-slate-400">
                        {item.type.replace("_", " ")}
                      </span>
                      {item.action} in {item.repo}
                    </span>
                    <span className="shrink-0 text-[0.62rem] text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="glass-panel gold-border rounded-3xl p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-50">Recent Repositories</h3>
        {reposLoading ? (
          <p className="text-xs text-slate-400">Fetching repositories...</p>
        ) : reposError ? (
          <div className="space-y-2">
            <p className="text-xs text-rose-300">{reposError}</p>
            <button
              type="button"
              onClick={() => void loadRepos()}
              className="rounded-full border border-amber-300/50 bg-slate-900/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-amber-100 transition-colors hover:border-amber-200 hover:text-amber-50"
            >
              Retry
            </button>
          </div>
        ) : repos.length === 0 ? (
          <p className="text-xs text-slate-400">No repositories could be loaded at this time.</p>
        ) : (
          <ul className="space-y-3 text-xs">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="group rounded-xl border border-slate-700/70 bg-slate-900/70 p-3 transition-colors hover:border-amber-300/70"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-1"
                >
                  <span className="font-medium text-slate-50 group-hover:text-amber-200">
                    {repo.name}
                  </span>
                  <span className="text-[0.72rem] text-slate-300">
                    {repo.description ?? "No description provided."}
                  </span>
                  <span className="text-[0.65rem] text-amber-200/80">
                    Stars: {repo.stargazers_count}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GitHubGraph;
