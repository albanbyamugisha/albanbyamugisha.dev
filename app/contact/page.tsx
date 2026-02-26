import { PROFILE, SITE_URL } from "@/lib/constants";
import SectionOrbit from "@/components/SectionOrbit";

const CONTACT_OPTIONS = [
  {
    label: "Email",
    value: "albanbyaugisha@gmail.com",
    helper: "Best for detailed project briefs, collaboration ideas, and formal opportunities.",
  },
  {
    label: "Phone / WhatsApp",
    value: PROFILE.phone,
    helper: "Ideal for time-sensitive conversations and quick coordination.",
  },
  {
    label: "GitHub",
    value: "github.com/albanbyaugisha",
    helper: "See what I&apos;m experimenting with, and how I structure real code.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/byamugisha-alban-3140bb37a",
    helper: "Connect professionally and follow my engineering journey.",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            Contact
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Let&apos;s build something thoughtful together.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            Whether you&apos;re exploring a new product, strengthening an existing system, or
            simply want to discuss architecture and engineering practice, I&apos;m open to{" "}
            <span className="font-medium text-amber-100">
              meaningful, well-scoped collaborations
            </span>
            .
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="Collaboration"
            items={["Discover", "Scope", "Design", "Build", "Review"]}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Ways to Reach Me
          </h2>
          <div className="mt-4 space-y-4 text-sm text-slate-200">
            {CONTACT_OPTIONS.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-3">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-amber-100/80">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-50">{item.value}</p>
                <p className="mt-1 text-[0.75rem] text-slate-300">{item.helper}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              Typical Collaborations
            </h2>
            <ul className="mt-3 space-y-3 text-sm text-slate-200">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                <span className="text-slate-300">
                  Designing and implementing new web applications or critical user-facing features.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                <span className="text-slate-300">
                  Reviewing existing architectures for scalability, security, and developer
                  experience.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                <span className="text-slate-300">
                  Collaborating on open-source or community-impact projects aligned with{" "}
                  {SITE_URL}.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

