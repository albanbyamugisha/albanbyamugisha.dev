import { SKILLS } from "@/lib/constants";
import SectionOrbit from "@/components/SectionOrbit";

export default function SkillsPage() {
  return (
    <div className="pb-16">
      <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            Skills
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            A toolkit that connects fundamentals with modern engineering practice.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            My skills are organized around how real systems are built:{" "}
            <span className="font-medium text-amber-100">
              backend foundations, data, frontends, DevOps, and intelligent systems
            </span>
            . Each technology is chosen for a reason and applied where it delivers the most value.
          </p>
        </div>

        <div className="glass-panel gold-border flex items-center justify-center rounded-3xl p-4 md:p-6">
          <SectionOrbit
            label="Skill Map"
            items={[
              "Backend & Systems",
              "Automation & Scripting",
              "Data & Persistence",
              "Architecture",
              "DevOps & DX",
              "Intelligent Systems",
            ]}
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {SKILLS.map((skill) => (
          <article
            key={skill.name}
            className="glass-panel gold-border flex flex-col rounded-3xl p-5 md:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
                  {skill.category}
                </h2>
                <p className="mt-2 text-base font-semibold text-slate-50">
                  {skill.name}
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-[0.8rem] leading-relaxed text-slate-200">
              <p>{skill.narrative}</p>
              <p className="text-slate-300">
                <span className="font-semibold text-amber-100/95">How I use it:</span>{" "}
                {skill.usage}
              </p>
              <p className="text-slate-300">
                <span className="font-semibold text-amber-100/95">In real systems:</span>{" "}
                {skill.realWorld}
              </p>
              <p className="text-slate-300">
                <span className="font-semibold text-amber-100/95">Mindset:</span>{" "}
                {skill.mindset}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

