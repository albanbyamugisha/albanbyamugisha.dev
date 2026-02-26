import SectionOrbit from "@/components/SectionOrbit";

const PROJECTS = [
  {
    name: "Personal Engineering Portfolio",
    role: "End-to-end Design & Implementation",
    period: "2025 – Present",
    stack: "Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion",
    impact:
      "A production-grade personal platform that demonstrates my approach to architecture, theming, animation, and content organization.",
    highlights: [
      "Custom theming system with persistent dark / light / gold modes.",
      "Thoughtful information architecture across About, Skills, Architecture, Security, DevOps, and Open Source sections.",
      "Modern visual language using glassmorphism, gradients, and subtle motion without sacrificing performance.",
    ],
  },
  {
    name: "System Design & Simulation Exercises",
    role: "System Architect & Implementer",
    period: "Ongoing",
    stack: "Java, Python, SQL, Docker, GitHub",
    impact:
      "A collection of system design scenarios where I practice modelling real-world workloads, failure modes, and observability strategies.",
    highlights: [
      "Designing services with clear SLIs/SLOs, capacity assumptions, and graceful degradation paths.",
      "Using simulations to test rate limiting, backpressure, and retry strategies before production.",
      "Documenting architecture decisions as ADRs and diagrams that can be understood quickly by new engineers.",
    ],
  },
  {
    name: "Learning & Teaching Artifacts",
    role: "Author & Maintainer",
    period: "Ongoing",
    stack: "Markdown, Diagrams, GitHub Projects",
    impact:
      "A curated set of notes, diagrams, and examples that consolidate what I am learning in software engineering, security, and DevOps.",
    highlights: [
      "Short, example-driven documents that explain concepts like idempotency, consistency models, and zero-downtime deployment.",
      "Architecture sketches that illustrate trade-offs between monoliths, modular monoliths, and microservices.",
      "Reusable checklists for code reviews, security hygiene, and release readiness.",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            Projects
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Selected work and systems that represent how I think.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            These projects focus less on chasing buzzwords and more on{" "}
            <span className="font-medium text-amber-100">
              clarity of architecture, reliability under change, and a strong developer experience
            </span>
            . Each one is a deliberate step in sharpening my engineering judgment.
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="Delivery Flow"
            items={["Discover", "Design", "Build", "Ship", "Observe", "Refine"]}
          />
        </div>
      </section>

      <section className="space-y-6">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className="glass-panel gold-border rounded-3xl p-5 md:p-6"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-50">
                  {project.name}
                </h2>
                <p className="text-[0.75rem] text-amber-100/90">
                  {project.role} · {project.period}
                </p>
              </div>
              <p className="text-[0.75rem] text-slate-300 md:text-right">
                <span className="font-semibold text-amber-100/90">Stack:</span>{" "}
                {project.stack}
              </p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              {project.impact}
            </p>

            <ul className="mt-3 space-y-2 text-[0.8rem] text-slate-200">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

