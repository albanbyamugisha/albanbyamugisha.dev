import SectionOrbit from "@/components/SectionOrbit";

const DEVOPS_PRACTICES = [
  "CI/CD pipelines that keep feedback loops tight while protecting main branches.",
  "Infrastructure-as-code for reproducible environments and safer experimentation.",
  "Monitoring, logging, and tracing that surface issues before users report them.",
  "Post-incident reviews that focus on learning and system improvement, not blame.",
];

const TOOLING_FOCUS = [
  "Version control workflows that support feature branches, code review, and safe releases.",
  "Automated tests at multiple levels: unit, integration, and smoke tests in CI.",
  "Containerization to align development and production environments.",
  "Dashboards and alerts tuned to meaningful signals, not noise.",
];

export default function DevOpsPage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            DevOps
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Bridging code and operations so shipping often feels safe.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            I see DevOps as the discipline of{" "}
            <span className="font-medium text-amber-100">
              shortening the path between an idea and a reliable deployment
            </span>
            . It&apos;s about automation, observability, and collaboration—not just tools.
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="Delivery Loop"
            items={["Plan", "Code", "Test", "Ship", "Observe", "Improve"]}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Core DevOps Practices
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-200">
            {DEVOPS_PRACTICES.map((item) => (
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
              Tooling & Focus Areas
            </h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-200">
              {TOOLING_FOCUS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              From Local to Production
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              This section will evolve into concrete examples of pipelines, deployment strategies,
              and observability setups I use in practice—showing how{" "}
              <span className="font-medium text-amber-100">
                small automation steps compound into faster, safer releases
              </span>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

