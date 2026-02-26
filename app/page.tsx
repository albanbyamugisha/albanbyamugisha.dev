import { motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import ProfileReveal from "@/components/ProfileReveal";
import GitHubGraph from "@/components/GitHubGraph";
import AnimatedText from "@/components/AnimatedText";
import LiveStatus from "@/components/LiveStatus";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import SkillsSection from "@/components/SkillsSection";
import ScrollSectionNav from "@/components/ScrollSectionNav";
import {
  HERO_MISSION_PARAGRAPHS,
  CORE_VALUES,
  WHY_WORK_WITH_ME,
  TESTIMONIALS,
  FAQ_ITEMS,
} from "@/lib/constants";

export default function Home() {
  return (
    <div className="relative pb-16">
      <MatrixBackground />
      <ScrollSectionNav />

      <section id="overview" className="relative z-10 scroll-mt-24">
        <div className="glass-panel gold-border overflow-hidden rounded-3xl px-5 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 space-y-4 md:space-y-6">
              <AnimatedText
                text="Designing and developing scalable, secure, and intelligent software systems."
                className="text-lg font-medium leading-relaxed text-slate-100 md:text-xl"
                delay={0.2}
              />
              <div className="space-y-3 text-sm leading-relaxed text-slate-200">
                {HERO_MISSION_PARAGRAPHS.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-col items-end gap-4 md:mt-0 md:w-60">
              <LiveStatus />
              <div className="rounded-2xl border border-amber-300/50 bg-slate-950/80 px-3 py-2 text-[0.72rem] text-amber-50 shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
                <p className="uppercase tracking-[0.2em] text-amber-200/90">
                  Focus
                </p>
                <p className="mt-1 text-[0.7rem] text-slate-100">
                  Scalable architectures · Secure-by-design interfaces ·
                  High-fidelity frontends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-10">
        <ProfileReveal />
      </section>

      <GitHubGraph />

      <section className="relative z-10 mt-16">
        <SkillsSection />
      </section>

      <section className="relative z-10 mt-16">
        <EducationSection />
      </section>

      <section className="relative z-10 mt-16">
        <CertificationsSection />
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Engineering Philosophy
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            I believe world‑class engineering is the result of consistent,
            intentional decision‑making—where architecture, code, and user
            experience are aligned with the same level of care. My work blends
            strategic thinking with hands‑on implementation: from designing
            modular systems and secure APIs to shaping polished, responsive
            interfaces that feel effortless to use.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            Every project is an opportunity to raise the quality bar: better
            observability, clearer contracts, faster feedback loops, and a more
            humane experience for both users and developers. I approach systems
            with a long‑term view—optimizing not just for launch, but for the
            many iterations that follow.
          </p>
        </div>

        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Core Values
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-200">
            {CORE_VALUES.map((value) => (
              <li key={value.title}>
                <p className="font-semibold text-amber-100">{value.title}</p>
                <p className="text-xs leading-relaxed text-slate-300">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Why Work With Me
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-200">
            {WHY_WORK_WITH_ME.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                <span className="text-xs leading-relaxed text-slate-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              Testimonials
            </h2>
            <div className="mt-3 space-y-4 text-sm text-slate-200">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="space-y-2">
                  <blockquote className="text-xs leading-relaxed text-slate-200">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="text-[0.7rem] text-amber-100/90">
                    {t.name} · {t.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              FAQ
            </h2>
            <div className="mt-3 space-y-3">
              {FAQ_ITEMS.slice(0, 2).map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-slate-700/70 bg-slate-900/70 p-3 text-xs text-slate-200"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                    <span className="font-medium text-slate-100">
                      {item.question}
                    </span>
                    <span className="text-[0.65rem] text-amber-200 group-open:rotate-90">
                      ▶
                    </span>
                  </summary>
                  <p className="mt-2 text-[0.72rem] leading-relaxed text-slate-300">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
