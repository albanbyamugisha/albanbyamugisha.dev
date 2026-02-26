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

