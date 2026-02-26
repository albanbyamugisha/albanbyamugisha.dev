import SectionOrbit from "@/components/SectionOrbit";

const OPEN_SOURCE_THEMES = [
  "Learning in public: sharing experiments, mistakes, and insights so others can benefit.",
  "Small, sharp tools: contributions that solve focused problems well instead of doing everything.",
  "Respect for maintainers: thoughtful issues, clear pull requests, and patience with review cycles.",
  "Documentation as contribution: improving READMEs, examples, and onboarding paths.",
];

export default function OpenSourcePage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            Open Source
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Contributing to a community that taught me how to build.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            Open source is where I test ideas, learn from engineers across the world, and give back
            to the ecosystem that powers most modern software. This page highlights{" "}
            <span className="font-medium text-amber-100">
              how I collaborate in public and what I look for in community projects
            </span>
            .
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="Community"
            items={["Issues", "Pull Requests", "Docs", "Starter Kits", "Discussions"]}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Themes in My Contributions
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-200">
            {OPEN_SOURCE_THEMES.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                <span className="text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            What You&apos;ll See Here
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            As my open-source footprint grows, this section will list specific repositories,
            merged pull requests, and initiatives I&apos;ve helped with—ranging from{" "}
            <span className="font-medium text-amber-100">
              documentation improvements and bug fixes to new features and starter templates
            </span>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

