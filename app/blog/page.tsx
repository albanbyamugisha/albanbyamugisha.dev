import SectionOrbit from "@/components/SectionOrbit";

const TOPIC_STREAMS = [
  {
    title: "Architecture & System Design",
    description:
      "Deep dives into real-world system design questions: how to choose boundaries, handle scale, and design for failure from day one.",
  },
  {
    title: "Frontend Engineering",
    description:
      "Articles on building resilient frontends that feel premium—covering state management, performance, accessibility, and motion design.",
  },
  {
    title: "Security & Reliability",
    description:
      "Notes on secure-by-default engineering, incident prevention, and the practical side of keeping systems trustworthy over time.",
  },
  {
    title: "Developer Experience",
    description:
      "Thoughts on workflows, tooling, and team practices that make engineering sustainable, not exhausting.",
  },
];

export default function BlogPage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            Blog
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Writing that turns engineering experience into reusable knowledge.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            This blog is where I turn experiments, project lessons, and late-night debugging
            sessions into{" "}
            <span className="font-medium text-amber-100">
              clear explanations, diagrams, and checklists
            </span>
            . The goal is simple: help future me—and other engineers—avoid repeating the same
            mistakes.
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="Topics"
            items={TOPIC_STREAMS.map((t) => t.title)}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {TOPIC_STREAMS.map((topic) => (
          <article
            key={topic.title}
            className="glass-panel gold-border rounded-3xl p-5 md:p-6"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              {topic.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              {topic.description}
            </p>
            <p className="mt-3 text-[0.75rem] text-slate-400">
              Upcoming posts will include step-by-step breakdowns, architecture sketches, and
              practical templates you can adapt to your own systems.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}

