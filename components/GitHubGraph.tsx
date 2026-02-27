"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GITHUB_USERNAME } from "@/lib/constants";
import { fetchGithubActivity, GithubActivityDay, GithubRepo } from "@/lib/github";

const RECENT_REPOS_API_URL =
  "https://api.github.com/users/albanbyamugisha/repos?sort=updated&per_page=6&type=owner";

const GitHubGraph = () => {
  const [activity, setActivity] = useState<GithubActivityDay[]>([]);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadActivity = async () => {
      try {
        const data = await fetchGithubActivity(GITHUB_USERNAME);
        if (!cancelled) {
          setActivity(data);
        }
      } catch {
        if (!cancelled) {
          setActivity([]);
        }
      } finally {
        if (!cancelled) {
          setActivityLoading(false);
        }
      }
    };

    void loadActivity();

    return () => {
      cancelled = true;
    };
  }, []);

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
        <div className="mt-2">
          {activityLoading ? (
            <p className="text-xs text-slate-400">Loading live activity...</p>
          ) : activity.length === 0 ? (
            <p className="text-xs text-slate-400">
              Contribution data is not available at the moment. GitHub rate limits may apply.
            </p>
          ) : (
            <div className="overflow-x-auto pb-2">
              <div className="flex min-w-max items-end gap-1 pr-1 sm:min-w-full">
                {activity.map((day) => {
                  const intensity = Math.min(day.count / 4, 1);
                  const height = 16 + intensity * 56;
                  const bg =
                    intensity === 0
                      ? "bg-slate-800/70"
                      : "bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-200";
                  return (
                    <motion.div
                      key={day.date}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height, opacity: 1 }}
                      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] as const }}
                      className={`relative w-2 rounded-full sm:w-2.5 ${bg} shadow-[0_0_22px_rgba(251,191,36,0.45)]`}
                    >
                      {day.count > 0 && (
                        <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 text-[0.6rem] text-amber-100/80">
                          {day.count}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-300">
          I treat open source and public repositories as an ongoing engineering journal.
          Contributions reflect deliberate iterations toward cleaner, more resilient systems.
        </p>
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
