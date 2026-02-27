export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
};

export type GithubActivityDay = {
  date: string;
  count: number;
};

export type GithubActivitySummary = {
  commits: number;
  pullRequests: number;
  issues: number;
};

export type GithubActivityItem = {
  id: string;
  type: "commit" | "pull_request" | "issue";
  repo: string;
  action: string;
  createdAt: string;
  url: string;
};

export type GithubActivityPayload = {
  daily: GithubActivityDay[];
  summary: GithubActivitySummary;
  recent: GithubActivityItem[];
};

type GithubPublicEvent = {
  id: string;
  type: string;
  created_at: string;
  repo?: {
    name?: string;
  };
  payload?: {
    action?: string;
    commits?: Array<{ sha?: string }>;
    pull_request?: { html_url?: string };
    issue?: { html_url?: string };
    ref_type?: string;
  };
};

export async function fetchGithubRepos(
  username: string,
  limit = 6,
): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
    {
      next: {
        revalidate: 60 * 30,
      },
    },
  );
  if (!res.ok) {
    return [];
  }
  const data = (await res.json()) as GithubRepo[];
  return data;
}

export async function fetchGithubActivity(
  username: string,
  days = 14,
): Promise<GithubActivityDay[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=100`,
    {
      next: {
        revalidate: 60 * 10,
      },
    },
  );
  if (!res.ok) {
    return [];
  }
  const raw = (await res.json()) as { created_at: string }[];
  const map = new Map<string, number>();

  const today = new Date();
  for (let i = 0; i < days; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, 0);
  }

  raw.forEach((event) => {
    const day = event.created_at.slice(0, 10);
    if (map.has(day)) {
      map.set(day, (map.get(day) ?? 0) + 1);
    }
  });

  const result: GithubActivityDay[] = Array.from(map.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  return result;
}

export async function fetchGithubActivityPayload(
  username: string,
  days = 84,
): Promise<GithubActivityPayload> {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=100`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!res.ok) {
    return {
      daily: [],
      summary: { commits: 0, pullRequests: 0, issues: 0 },
      recent: [],
    };
  }

  const raw = (await res.json()) as GithubPublicEvent[];
  const map = new Map<string, number>();
  const summary: GithubActivitySummary = {
    commits: 0,
    pullRequests: 0,
    issues: 0,
  };
  const recent: GithubActivityItem[] = [];

  const today = new Date();
  for (let i = 0; i < days; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    map.set(d.toISOString().slice(0, 10), 0);
  }

  for (const event of raw) {
    const eventDay = event.created_at?.slice(0, 10);
    if (!eventDay || !map.has(eventDay)) continue;

    let delta = 0;
    let type: GithubActivityItem["type"] | null = null;
    let url = `https://github.com/${event.repo?.name ?? username}`;
    let action = "activity";

    if (event.type === "PushEvent") {
      const commitCount = event.payload?.commits?.length ?? 0;
      summary.commits += commitCount;
      delta = Math.max(1, commitCount);
      type = "commit";
      action = `${commitCount} commit${commitCount === 1 ? "" : "s"} pushed`;
    } else if (event.type === "PullRequestEvent") {
      summary.pullRequests += 1;
      delta = 2;
      type = "pull_request";
      action = event.payload?.action ? `PR ${event.payload.action}` : "PR activity";
      url = event.payload?.pull_request?.html_url ?? url;
    } else if (event.type === "IssuesEvent") {
      summary.issues += 1;
      delta = 2;
      type = "issue";
      action = event.payload?.action
        ? `Issue ${event.payload.action}`
        : "Issue activity";
      url = event.payload?.issue?.html_url ?? url;
    } else {
      delta = 1;
    }

    map.set(eventDay, (map.get(eventDay) ?? 0) + delta);

    if (type && recent.length < 10) {
      recent.push({
        id: event.id,
        type,
        repo: event.repo?.name ?? username,
        action,
        createdAt: event.created_at,
        url,
      });
    }
  }

  const daily = Array.from(map.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  return { daily, summary, recent };
}

