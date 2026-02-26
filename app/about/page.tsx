import Image from "next/image";
import { CORE_VALUES, EDUCATION_HISTORY, PROFILE } from "@/lib/constants";
import SectionOrbit from "@/components/SectionOrbit";

export default function AboutPage() {
  return (
    <div className="relative pb-16">
      <section className="mb-10 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-7">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
            About
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            Building software systems that stay reliable long after launch.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            I am {PROFILE.name}, a software engineer focused on{" "}
            <span className="font-medium text-amber-100">
              scalable architectures, secure-by-design systems, and high-fidelity frontends
            </span>
            . I enjoy moving from whiteboard diagrams to production code—making sure that
            performance, reliability, and developer experience are all treated as first-class
            requirements.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            My work philosophy is simple: every line of code and every architecture decision should
            make life easier for both users and future engineers. That means clear boundaries,
            predictable behavior under load, and enough observability to understand what the system
            is doing at any moment.
          </p>
        </div>

        <div className="glass-panel gold-border flex flex-col gap-4 rounded-3xl p-5 md:p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-900">
              <Image
                src="/images/profile-alban.png"
                alt={PROFILE.name}
                fill
                sizes="64px"
                className="object-cover object-center portrait-glow"
                priority
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
                Profile
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-50">
                {PROFILE.name}
              </p>
              <p className="text-[0.7rem] text-slate-300">{PROFILE.title}</p>
            </div>
          </div>
          <div className="grid gap-3 text-[0.72rem] text-slate-200 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-amber-100/80">
                Location
              </p>
              <p>{PROFILE.location}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-amber-100/80">
                Contact
              </p>
              <p>{PROFILE.phone}</p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-amber-100/80">
                Focus
              </p>
              <p>{PROFILE.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Education & Foundations
          </h2>
          <div className="mt-4 space-y-5">
            {EDUCATION_HISTORY.map((item) => (
              <article
                key={item.institution}
                className="border-l border-slate-700/70 pl-4 text-sm text-slate-200"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-amber-100/80">
                  {item.period}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-50">
                  {item.qualification}
                </h3>
                <p className="text-[0.72rem] text-slate-300">{item.institution}</p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <SectionOrbit
            label="Focus Areas"
            items={["Architecture", "Security", "Frontend", "DevOps"]}
          />
          <div className="glass-panel gold-border rounded-3xl p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-100/80">
              Core Engineering Values
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
        </div>
      </section>
    </div>
  );
}

