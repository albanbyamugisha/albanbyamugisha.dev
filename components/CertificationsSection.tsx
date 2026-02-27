"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";

const Certifications3DScene = dynamic(
  () => import("./Certifications3DScene"),
  {
    ssr: false,
    loading: () => (
      <div className="cert-3d-skeleton" aria-hidden="true" />
    ),
  },
);

type CertificationCategory = "ai" | "communication" | "programming";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  categories: CertificationCategory[];
};

const CERTIFICATIONS: Certification[] = [
  {
    id: "oops-java-simplilearn",
    title: "OOPs in Java",
    issuer: "Simplilearn",
    date: "Feb 2026",
    skills: [
      "IDE Mastery",
      "Design Patterns",
      "Java Collections",
      "Core Java",
      "OOP",
    ],
    categories: ["programming"],
  },
  {
    id: "github-basics-simplilearn",
    title: "GitHub Basics",
    issuer: "Simplilearn",
    date: "Feb 2026",
    skills: [
      "Git",
      "GitHub",
      "Version Control",
      "Branching",
      "Pull Requests",
      "Repository Management",
    ],
    categories: ["programming"],
  },
  {
    id: "communication-skills-simplilearn",
    title: "Communication Skills Course",
    issuer: "Simplilearn",
    date: "Feb 2026",
    skills: [
      "Interpersonal Skills",
      "Active Listening",
      "Written Communication",
      "Team Collaboration",
    ],
    categories: ["communication"],
  },
  {
    id: "modern-ai-cisco",
    title: "Modern AI",
    issuer: "Cisco Networking Academy",
    date: "Jan 2026",
    skills: [
      "Machine Learning Fundamentals",
      "Neural Networks Basics",
      "Model Training Concepts",
    ],
    categories: ["ai"],
  },
  {
    id: "ai-hp-life",
    title: "AI",
    issuer: "HP LIFE",
    date: "Jan 2026",
    skills: [
      "AI for Business",
      "Digital Transformation",
      "Ethical AI",
      "Problem Solving",
    ],
    categories: ["ai"],
  },
  {
    id: "spoken-english-simplilearn",
    title: "Spoken English Course",
    issuer: "Simplilearn",
    date: "Feb 2026",
    skills: [
      "Public Speaking",
      "Business Communication",
      "Presentation Skills",
    ],
    categories: ["communication"],
  },
  {
    id: "basics-effective-communication-uniathena",
    title: "Basics of Effective Communication",
    issuer: "UniAthena",
    date: "Feb 2026",
    skills: [
      "Technical Presentation",
      "Professional Communication",
      "Conflict Resolution",
    ],
    categories: ["communication"],
  },
  {
    id: "basics-sql-uniathena",
    title: "Basics of SQL",
    issuer: "UniAthena",
    date: "Feb 2026",
    skills: [
      "Filtering & Sorting",
      "Grouping & Aggregation",
      "SQL Queries",
    ],
    categories: ["programming"],
  },
  {
    id: "sql-simplilearn",
    title: "SQL",
    issuer: "Simplilearn",
    date: "Feb 2026",
    skills: ["DBMS", "Query Optimization", "Relational Design", "Indexing"],
    categories: ["programming"],
  },
  {
    id: "java-programming-simplilearn",
    title: "Java Programming",
    issuer: "Simplilearn Education",
    date: "Jan 2026",
    skills: ["Java Programming", "Data Structures"],
    categories: ["programming"],
  },
  {
    id: "critical-thinking-ai-era-hp-life",
    title: "Critical Thinking in the AI Era",
    issuer: "HP LIFE",
    date: "Jan 2026",
    skills: [
      "AI Literacy",
      "Analytical Reasoning",
      "Decision-Making",
    ],
    categories: ["ai"],
  },
  {
    id: "hp-life-ambassador",
    title: "HP LIFE Ambassador",
    issuer: "HP LIFE",
    date: "Jan 2026",
    skills: [],
    categories: ["ai", "communication"],
  },
];

type AnimatedCounterProps = {
  label: string;
  value: number;
  accent: "amber" | "cyan" | "violet" | "emerald";
  delay?: number;
};

const AnimatedCounter = ({
  label,
  value,
  accent,
  delay = 0,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    let frame: number;
    const duration = 900;
    const start = performance.now() + delay * 1000;

    const animate = (now: number) => {
      if (now < start) {
        frame = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [delay, value]);

  const accentClass =
    accent === "amber"
      ? "from-amber-300 to-amber-500"
      : accent === "cyan"
        ? "from-cyan-300 to-sky-400"
        : accent === "violet"
          ? "from-violet-300 to-fuchsia-400"
          : "from-emerald-300 to-emerald-500";

  return (
    <motion.div
      className="flex flex-col gap-1 rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-[0.7rem] text-slate-200 shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1] as const,
        delay,
      }}
    >
      <span className="uppercase tracking-[0.22em] text-slate-400">
        {label}
      </span>
      <span
        className={`bg-gradient-to-r ${accentClass} bg-clip-text text-xl font-semibold text-transparent`}
      >
        {displayValue.toString().padStart(2, "0")}
      </span>
    </motion.div>
  );
};

type SkillsPillsProps = {
  skills: string[];
};

const SkillsPills = ({ skills }: SkillsPillsProps) => {
  if (!skills.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.18em] text-slate-200/90"
          initial={{ opacity: 0, scale: 0.85, y: 6 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            delay: 0.15 + index * 0.05,
            duration: 0.45,
            ease: [0.19, 1, 0.22, 1] as const,
          }}
        >
          <motion.span
            className="inline-flex items-center"
            animate={{
              boxShadow: [
                "0 0 0 rgba(255,255,255,0)",
                "0 0 18px rgba(248,250,252,0.25)",
                "0 0 0 rgba(255,255,255,0)",
              ],
              opacity: [0.85, 1, 0.9],
            }}
            transition={{
              delay: 0.4 + index * 0.12,
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="mr-1 h-1 w-1 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
            {skill}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
};

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.45 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const total = CERTIFICATIONS.length;
    const ai = CERTIFICATIONS.filter((c) => c.categories.includes("ai")).length;
    const communication = CERTIFICATIONS.filter((c) =>
      c.categories.includes("communication"),
    ).length;
    const programming = CERTIFICATIONS.filter((c) =>
      c.categories.includes("programming"),
    ).length;

    return { total, ai, communication, programming };
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="cert-section relative mt-20 scroll-mt-24"
    >
      <Certifications3DScene />

      <motion.button
        type="button"
        aria-label="Scroll to Licenses & Certifications section"
        onClick={() => {
          document
            .getElementById("certifications")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="cert-nav-dot"
        data-active={inView}
        initial={{ opacity: 0, scale: 0.8, x: 40 }}
        animate={{
          opacity: inView ? 1 : 0.85,
          scale: inView ? 1 : 0.9,
          x: 0,
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] as const }}
      >
        <span className="cert-nav-dot-inner" />
      </motion.button>

      <div className="glass-panel gold-border cert-panel rounded-3xl px-5 py-6 md:px-8 md:py-8">
        <div className="cert-grid-overlay" aria-hidden="true" />

        <motion.header
          className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] as const }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/80">
              Licenses & Certifications
            </p>
            <motion.h2
              className="mt-1 text-lg font-semibold tracking-tight text-slate-50 md:text-xl glitch-heading"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              animate={{
                x: [0, -0.8, 0.8, 0],
                skewX: [0, -1.2, 1.2, 0],
              }}
              transition={{
                duration: 0.28,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 6,
              }}
            >
              <span className="relative inline-block text-gradient-gold">
                Proof of continuous learning in code, AI, and communication.
              </span>
            </motion.h2>
            <AnimatedText
              text="Each certification is a checkpoint in how I sharpen my engineering, AI, and communication skillsâ€”with a focus on practical impact, not just badges."
              className="mt-3 max-w-xl text-xs leading-relaxed text-slate-200 md:text-[0.8rem]"
              delay={0.35}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[0.7rem] sm:grid-cols-4 sm:gap-3 md:max-w-md">
            <AnimatedCounter
              label="Total"
              value={stats.total}
              accent="amber"
            />
            <AnimatedCounter
              label="AI"
              value={stats.ai}
              accent="cyan"
              delay={0.08}
            />
            <AnimatedCounter
              label="Communication"
              value={stats.communication}
              accent="violet"
              delay={0.16}
            />
            <AnimatedCounter
              label="Programming"
              value={stats.programming}
              accent="emerald"
              delay={0.24}
            />
          </div>
        </motion.header>

        <motion.div
          className="relative mt-7 grid gap-4 md:mt-9 md:grid-cols-2 lg:gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {CERTIFICATIONS.map((cert, index) => {
            const isExpanded = expandedId === cert.id;

            return (
              <motion.article
                key={cert.id}
                className="group float-slow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  ease: [0.19, 1, 0.22, 1] as const,
                  delay: 0.1 + index * 0.04,
                }}
              >
                <motion.button
                  type="button"
                  onClick={() =>
                    setExpandedId((prev) =>
                      prev === cert.id ? null : cert.id,
                    )
                  }
                  className="tilt-card relative flex w-full flex-col items-stretch overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/80 p-4 text-left text-[0.72rem] text-slate-200 shadow-[0_22px_60px_rgba(0,0,0,0.9)] md:p-5"
                  whileHover={{
                    boxShadow:
                      "0 28px 80px rgba(0,0,0,0.95), 0 0 80px rgba(129, 230, 217, 0.35)",
                  }}
                  transition={{
                    duration: 0.28,
                    ease: [0.19, 1, 0.22, 1] as const,
                  }}
                >
                  <div className="pointer-events-none absolute inset-px rounded-2xl border border-transparent bg-[radial-gradient(circle_at_0%_0%,rgba(248,250,252,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(45,212,191,0.35),transparent_55%)] opacity-0 mix-blend-screen blur-[0.3px] transition-opacity duration-400 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -inset-x-16 -top-16 h-24 translate-y-8 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.4),transparent_50%),radial-gradient(circle_at_100%_0%,rgba(251,191,36,0.45),transparent_55%)] opacity-0 blur-3xl transition-all duration-600 group-hover:translate-y-0 group-hover:opacity-80" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.25em] text-emerald-300/90">
                        {cert.date}
                      </p>
                      <p className="mt-1 text-[0.9rem] font-semibold text-slate-50 md:text-[0.95rem]">
                        {cert.title}
                      </p>
                      <p className="mt-0.5 text-[0.7rem] text-slate-300">
                        {cert.issuer}
                      </p>
                    </div>
                    <motion.div
                      className="flex flex-col items-end gap-1 text-[0.6rem] uppercase tracking-[0.18em]"
                      initial={{ opacity: 0, y: -6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        delay: 0.2 + index * 0.04,
                        duration: 0.4,
                        ease: [0.19, 1, 0.22, 1] as const,
                      }}
                    >
                      <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-emerald-200">
                        {cert.categories.join(" Â· ")}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 group-hover:text-amber-100/90">
                        <span className="h-[1px] w-5 bg-gradient-to-r from-emerald-300/80 via-amber-200/80 to-transparent" />
                        {isExpanded ? "Collapse" : "Expand"}
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="relative mt-3 space-y-2 text-[0.7rem] leading-relaxed text-slate-300"
                    layout
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : "2.4rem",
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.19, 1, 0.22, 1] as const,
                    }}
                  >
                    <p className="line-clamp-2 md:line-clamp-3">
                      This certification tracks a focused learning path in{" "}
                      <span className="font-medium text-emerald-200">
                        {cert.categories.join(", ")}
                      </span>{" "}
                      and strengthens how I design, communicate, and ship
                      modern software systems.
                    </p>
                    {isExpanded && (
                      <p className="text-[0.68rem] text-slate-400">
                        Expanding reveals the skills tags in motionâ€”each
                        representing a capability I deliberately practiced,
                        not just read about.
                      </p>
                    )}
                  </motion.div>

                  <SkillsPills skills={cert.skills} />
                </motion.button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;

