import SectionOrbit from "@/components/SectionOrbit";

const SECURITY_PILLARS = [
  "Secure defaults: systems should be safe out of the box without relying on every user to make perfect choices.",
  "Principle of least privilege: every service, token, and user gets only the access they truly need.",
  "Defense in depth: multiple layers of validation, authorization, and monitoring instead of a single hard shell.",
  "Visibility and response: security work is incomplete without good alerting, incident playbooks, and post-incident learning.",
];

const PRACTICES = [
  "Input validation and output encoding for all external-facing boundaries.",
  "Secure secret management using environment isolation and rotation strategies.",
  "Threat modelling early in the design process to identify abuse cases and high-value assets.",
  "Regular review of dependencies, configurations, and access policies.",
];

export default function SecurityPage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            Security
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Security is a way of thinking, not a checklist at the end.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            I treat security as a design constraint from the first conversation. That means
            understanding{" "}
            <span className="font-medium text-amber-100">
              what we&apos;re protecting, who we&apos;re protecting it from, and how the system
              should behave when something goes wrong
            </span>
            .
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="Security Lens"
            items={["Least Privilege", "Secure Defaults", "Defense in Depth", "Detection & Response"]}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Core Security Pillars
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-200">
            {SECURITY_PILLARS.map((item) => (
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
              Everyday Practices
            </h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-200">
              {PRACTICES.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              What This Page Will Showcase
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Over time, this space will contain threat models, security checklists, and examples of
              how I harden APIs, frontends, and infrastructure. The emphasis will be on{" "}
              <span className="font-medium text-amber-100">
                practical, repeatable patterns that raise the security baseline without blocking
                delivery
              </span>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

