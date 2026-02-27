"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GITHUB_USERNAME } from "@/lib/constants";
import {
  fetchGithubActivityPayload,
  GithubActivityDay,
  GithubActivityItem,
  GithubCommitItem,
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
  const [recentCommits, setRecentCommits] = useState<GithubCommitItem[]>([]);
  const [contributions, setContributions] = useState<GithubActivityDay[]>([]);
  const [contributionsTotal, setContributionsTotal] = useState(0);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityError, setActivityError] = useState<string | null>(null);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);
  const [contributionsLoading, setContributionsLoading] = useState(true);
  const [contributionsError, setContributionsError] = useState<string | null>(
    null,
  );

  const loadActivity = useCallback(async (signal?: AbortSignal) => {
    setActivityLoading(true);
    setActivityError(null);

    try {
      const payload = await fetchGithubActivityPayload(GITHUB_USERNAME, 84);
      if (signal?.aborted) return;
      setActivity(payload.daily);
      setSummary(payload.summary);
      setRecent(payload.recent);
      setRecentCommits(payload.recentCommits);
      if (!payload.daily.length) {
        setActivityError("Live activity is currently unavailable.");
      }
    } catch {
      if (signal?.aborted) return;
      setActivity([]);
      setSummary({ commits: 0, pullRequests: 0, issues: 0 });
      setRecent([]);
      setRecentCommits([]);
      setActivityError("Unable to load live contribution activity.");
    } finally {
      if (!signal?.aborted) {
        setActivityLoading(false);
      }
    }
  }, []);

  const loadContributions = useCallback(async (signal?: AbortSignal) => {
    setContributionsLoading(true);
    setContributionsError(null);

    try {
      const response = await fetch("/api/github/contributions", { signal });
      if (!response.ok) {
        throw new Error("Unable to load contributions right now.");
      }
      const data = (await response.json()) as {
        days: GithubActivityDay[];
        total: number;
      };
      if (signal?.aborted) return;
      setContributions(data.days ?? []);
      setContributionsTotal(data.total ?? 0);
      if (!data.days?.length) {
        setContributionsError("No contribution data available.");
      }
    } catch {
      if (signal?.aborted) return;
      setContributions([]);
      setContributionsTotal(0);
      setContributionsError("Unable to load contributions right now.");
    } finally {
      if (!signal?.aborted) {
        setContributionsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadActivity(controller.signal);
    void loadContributions(controller.signal);
    const interval = window.setInterval(() => {
      void loadActivity();
      void loadContributions();
    }, 60_000);

    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, [loadActivity, loadContributions]);

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

  const graphDays = useMemo(
    () => (contributions.length ? contributions : activity),
    [activity, contributions],
  );

  const graphLoading =
    graphDays.length === 0 && (contributionsLoading || activityLoading);
  const graphError =
    graphDays.length === 0 ? contributionsError ?? activityError : null;

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
        <div className="mb-4 grid grid-cols-2 gap-2 text-[0.65rem] sm:grid-cols-4">
          <div className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-2 py-1.5">
            <p className="uppercase tracking-[0.15em] text-slate-400">
              Contributions
            </p>
            <p className="mt-1 text-sm font-semibold text-amber-200">
              {contributionsTotal}
            </p>
          </div>
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
        <div className="mt-3">
          {graphLoading ? (
            <p className="text-xs text-slate-400">Loading live activity...</p>
          ) : graphError ? (
            <p className="text-xs text-slate-400">{graphError}</p>
          ) : (
            <div className="cert-panel-graph overflow-x-auto pb-2">
              <div className="cert-panel-graph-grid inline-grid grid-flow-col grid-rows-7 gap-1 pr-1">
                {graphDays.map((day, index) => {
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
                      className={`cert-panel-graph-cell rounded-[3px] ${bgClass} ring-1 ring-black/10`}
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
            Live GitHub contributions (last 12 months) plus recent public activity for commits, pull requests, and issues.
          </p>
          {!activityLoading && recentCommits.length > 0 && (
            <div className="space-y-2">
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-slate-400">
                Latest commits
              </p>
              <ul className="space-y-1.5 text-[0.68rem] text-slate-300">
                {recentCommits.slice(0, 4).map((commit) => (
                  <li
                    key={commit.id}
                    className="rounded-lg border border-slate-700/70 bg-slate-900/60 px-2 py-1.5"
                  >
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-2 hover:text-amber-200"
                    >
                      <span className="min-w-0 truncate">
                        <span className="mr-1 uppercase tracking-[0.12em] text-slate-400">
                          {commit.repo}
                        </span>
                        {commit.message}
                      </span>
                      <span className="shrink-0 text-[0.62rem] text-slate-500">
                        {new Date(commit.createdAt).toLocaleDateString()}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
