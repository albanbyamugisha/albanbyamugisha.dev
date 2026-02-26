"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GITHUB_USERNAME } from "@/lib/constants";
import {
  fetchGithubActivity,
  fetchGithubRepos,
  GithubActivityDay,
  GithubRepo,
} from "@/lib/github";

const GitHubGraph = () => {
  const [activity, setActivity] = useState<GithubActivityDay[]>([]);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [a, r] = await Promise.all([
          fetchGithubActivity(GITHUB_USERNAME),
          fetchGithubRepos(GITHUB_USERNAME, 6),
        ]);
        if (!cancelled) {
          setActivity(a);
          setRepos(r);
        }
      } catch {
        if (!cancelled) {
          setActivity([]);
          setRepos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="activity"
      className="mt-16 scroll-mt-24 grid gap-8 md:grid-cols-[1.4fr_minmax(0,1fr)]"
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
          <div className="text-[0.7rem] text-slate-400">
            @{GITHUB_USERNAME}
          </div>
        </div>
        <div className="mt-2">
          {loading ? (
            <p className="text-xs text-slate-400">Loading live activity…</p>
          ) : activity.length === 0 ? (
            <p className="text-xs text-slate-400">
              Contribution data is not available at the moment. GitHub rate
              limits may apply.
            </p>
          ) : (
            <div className="flex items-end gap-1">
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
                    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                    className={`relative w-2.5 rounded-full ${bg} shadow-[0_0_22px_rgba(251,191,36,0.45)]`}
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
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-300">
          I treat open source and public repositories as an ongoing engineering
          journal—capturing experiments, reusable patterns, and learnings that
          others can build on. Contributions reflect more than commits; they
          represent deliberate iterations toward cleaner, more resilient
          systems.
        </p>
      </div>

      <div className="glass-panel gold-border rounded-3xl p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-50">
          Recent Repositories
        </h3>
        {loading ? (
          <p className="text-xs text-slate-400">Fetching repositories…</p>
        ) : repos.length === 0 ? (
          <p className="text-xs text-slate-400">
            No repositories could be loaded at this time.
          </p>
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
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-50 group-hover:text-amber-200">
                      {repo.name}
                    </span>
                    <span className="text-[0.65rem] text-slate-400">
                      {repo.language ?? "Mixed"}
                    </span>
                  </span>
                  {repo.description && (
                    <span className="text-[0.72rem] text-slate-300">
                      {repo.description}
                    </span>
                  )}
                  <span className="text-[0.65rem] text-amber-200/80">
                    ★ {repo.stargazers_count}
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

