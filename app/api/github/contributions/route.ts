import { NextResponse } from "next/server";
import { GITHUB_USERNAME } from "@/lib/constants";

type ContributionDay = {
  date: string;
  count: number;
};

const CONTRIBUTIONS_URL = (username: string, from: string, to: string) =>
  `https://github.com/users/${username}/contributions?from=${from}&to=${to}`;

const parseContributionDays = (html: string) => {
  const days: ContributionDay[] = [];
  const rectRegex =
    /<rect[^>]*data-date="([^"]+)"[^>]*data-count="(\d+)"[^>]*>/g;

  let match: RegExpExecArray | null = null;
  while ((match = rectRegex.exec(html)) !== null) {
    const [, date, count] = match;
    days.push({ date, count: Number(count) });
  }

  days.sort((a, b) => (a.date < b.date ? -1 : 1));
  return days;
};

const buildDateRange = () => {
  const to = new Date();
  const from = new Date(to);
  from.setDate(to.getDate() - 365);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
};

export async function GET() {
  const { from, to } = buildDateRange();

  try {
    const response = await fetch(CONTRIBUTIONS_URL(GITHUB_USERNAME, from, to), {
      cache: "no-store",
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { days: [], total: 0, from, to },
        { status: response.status },
      );
    }

    const html = await response.text();
    const days = parseContributionDays(html);
    const total = days.reduce((sum, day) => sum + day.count, 0);

    return NextResponse.json({ days, total, from, to });
  } catch {
    return NextResponse.json({ days: [], total: 0, from, to }, { status: 500 });
  }
}
