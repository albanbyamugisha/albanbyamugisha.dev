import SectionOrbit from "@/components/SectionOrbit";

const PRINCIPLES = [
  "Design for failure first: assume networks partition, services restart, and dependencies degrade.",
  "Keep boundaries sharp: every service or module should have a single, clear responsibility.",
  "Prefer explicit contracts: versioned APIs, clear schemas, and well-defined expectations.",
  "Optimize for observability: logs, metrics, and traces that tell a coherent story during incidents.",
];

const PATTERNS = [
  "Layered architectures that separate delivery, domain logic, and infrastructure concerns.",
  "Event-driven communication where it simplifies workflows and improves decoupling.",
  "Caching strategies that balance freshness, consistency, and cost.",
  "Database designs that respect access patterns instead of mirroring UI screens.",
];

export default function ArchitecturePage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            Architecture
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Turning requirements into systems that stay understandable as they grow.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            Architecture to me is less about drawing perfect diagrams and more about{" "}
            <span className="font-medium text-amber-100">
              making trade-offs explicit and reversible
            </span>
            . This page captures how I think when designing APIs, data flows, and deployment
            topologies.
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="System View"
            items={["Clients", "APIs", "Services", "Data", "Observability", "Ops"]}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Core Principles
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-200">
            {PRINCIPLES.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                <span className="text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              Patterns I Reach For
            </h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-200">
              {PATTERNS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              What You&apos;ll Find Here
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Over time, this section will accumulate architecture diagrams, sequence flows, and
              design documents from real and simulated systems. The goal is to show{" "}
              <span className="font-medium text-amber-100">
                how decisions were made, not just the final diagram
              </span>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

