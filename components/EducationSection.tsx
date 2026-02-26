"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

type EducationItem = {
  id: string;
  institution: string;
  qualification: string;
  period: string;
  meta?: string;
  highlights: string[];
  tag: string;
};

const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: "must",
    institution: "Mbarara University of Science & Technology",
    qualification: "Bachelor of Science in Software Engineering",
    period: "Aug 2025 – Dec 2029",
    meta: "Strong foundations in software engineering, systems design, and applied computer science.",
    highlights: [
      "Strong training in software development, system design, and database management.",
      "Skilled in programming, data structures, and software engineering principles.",
      "Ability to design, build, test, and maintain scalable applications.",
      "Strong analytical and problem-solving skills.",
      "Activities: Software Engineering & Technology Community, coding practice, and personal software projects.",
    ],
    tag: "Software Engineering Degree",
  },
  {
    id: "st-balikudembe",
    institution: "St. Balikudembe Secondary School – Kisoga",
    qualification: "Uganda Advanced Certificate of Education (UACE)",
    period: "Jan 2023 – Dec 2024",
    meta: "Advanced secondary education with a STEM and ICT emphasis.",
    highlights: [
      "Subjects: Physics, Economics, Mathematics, ICT, General Paper.",
      "Developed analytical, quantitative, and logical reasoning skills.",
      "Built a strong foundation in ICT and communication.",
    ],
    tag: "Advanced Level (UACE)",
  },
  {
    id: "mwizi",
    institution: "Mwizi Secondary School",
    qualification: "Uganda Certificate of Education (UCE)",
    period: "Jan 2018 – Dec 2022",
    meta: "Core secondary education with a strong science and ICT focus.",
    highlights: [
      "Strong foundation in science, mathematics, and ICT.",
      "Developed analytical and critical thinking skills.",
    ],
    tag: "Ordinary Level (UCE)",
  },
  {
    id: "akashabo",
    institution: "Akashabo Primary School",
    qualification: "Primary Leaving Education (PLE)",
    period: "Jan 2011 – Dec 2017",
    meta: "Foundational academic training and early leadership experiences.",
    highlights: ["Developed foundational academic and leadership skills."],
    tag: "Primary Foundations",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const EducationSection = () => {
  return (
    <section id="education" className="mt-16 scroll-mt-20">
      <div className="education-section relative">
        <div aria-hidden="true" className="education-bg">
          <div className="education-bg-grid" />
          <div className="education-bg-orbit" />
          <div className="education-bg-nodes" />
        </div>

        <motion.div
          className="glass-panel gold-border rounded-3xl px-5 py-6 md:px-8 md:py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          <motion.header
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            variants={headerVariants}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/80">
                Education Timeline
              </p>
              <AnimatedText
                text="Foundations in software engineering, analytical thinking, and systems-level problem solving."
                className="mt-2 max-w-xl text-sm leading-relaxed text-slate-100 md:text-[0.9rem]"
                delay={0.15}
              />
            </div>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-slate-950/80 px-3 py-1.5 text-[0.7rem] text-amber-50 shadow-[0_16px_45px_rgba(0,0,0,0.9)]"
              variants={chipVariants}
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              <span className="uppercase tracking-[0.18em] text-amber-100/80">
                Always Learning
              </span>
            </motion.div>
          </motion.header>

          <motion.div
            className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2"
            variants={containerVariants}
          >
            {EDUCATION_ITEMS.map((item, index) => (
              <motion.article
                key={item.id}
                className="group tilt-card relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/80 p-4 text-xs text-slate-200 shadow-[0_18px_48px_rgba(0,0,0,0.8)] md:p-5"
                variants={cardVariants}
                transition={{
                  delay: 0.15 + index * 0.08,
                }}
              >
                <div className="pointer-events-none absolute inset-px rounded-2xl border border-transparent bg-[radial-gradient(circle_at_0%_0%,rgba(248,250,252,0.12),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(251,191,36,0.2),transparent_55%)] opacity-0 mix-blend-screen blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -inset-x-10 -top-16 h-24 translate-y-10 bg-[radial-gradient(circle_at_10%_0%,rgba(251,191,36,0.4),transparent_55%),radial-gradient(circle_at_90%_30%,rgba(96,165,250,0.4),transparent_55%)] opacity-0 blur-3xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-70" />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.24em] text-amber-100/80">
                      {item.period}
                    </p>
                    <h3 className="mt-1 text-[0.9rem] font-semibold text-slate-50 md:text-[0.95rem]">
                      {item.qualification}
                    </h3>
                    <p className="mt-0.5 text-[0.7rem] text-slate-300">
                      {item.institution}
                    </p>
                  </div>
                  <motion.span
                    className="inline-flex items-center rounded-full border border-amber-300/60 bg-slate-900/80 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-amber-50/90 shadow-[0_0_18px_rgba(212,175,55,0.45)]"
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      delay: 0.25 + index * 0.06,
                      duration: 0.4,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    {item.tag}
                  </motion.span>
                </div>

                {item.meta && (
                  <p className="relative mt-3 text-[0.7rem] leading-relaxed text-slate-300">
                    {item.meta}
                  </p>
                )}

                <ul className="relative mt-3 space-y-1.5 text-[0.7rem] leading-relaxed text-slate-200">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.9)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-4 flex items-center justify-between text-[0.65rem] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-[1px] w-6 bg-gradient-to-r from-amber-400/70 via-amber-200/80 to-transparent" />
                    <span className="uppercase tracking-[0.24em]">Track</span>
                  </div>
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-400 group-hover:text-amber-100/80">
                    Learning · Growth · Impact
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;

