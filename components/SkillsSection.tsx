"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  FiCpu,
  FiGitBranch,
  FiGitMerge,
  FiGitPullRequest,
  FiLayers,
  FiMessageCircle,
  FiSliders,
  FiTrendingUp,
} from "react-icons/fi";
import AnimatedText from "./AnimatedText";

type SkillCategory = "industry" | "tools" | "analytical";

type Skill = {
  id: string;
  label: string;
  category: SkillCategory;
  level: number;
  emphasis: "primary" | "secondary";
  description: string;
};

const SKILLS: Skill[] = [
  {
    id: "core-java",
    label: "Core Java Proficiency",
    category: "industry",
    level: 92,
    emphasis: "primary",
    description:
      "Designing robust backends, APIs, and production-grade systems with Java as the core language foundation.",
  },
  {
    id: "oop",
    label: "Object-Oriented Programming (OOP)",
    category: "industry",
    level: 94,
    emphasis: "primary",
    description:
      "Modeling real-world domains into clean, maintainable abstractions with strong encapsulation and clear contracts.",
  },
  {
    id: "ide-mastery",
    label: "IDE Mastery",
    category: "industry",
    level: 90,
    emphasis: "secondary",
    description:
      "Leveraging advanced IDE workflows, refactors, and debugging to keep feedback loops fast and precise.",
  },
  {
    id: "design-patterns",
    label: "Software Design Patterns",
    category: "industry",
    level: 88,
    emphasis: "secondary",
    description:
      "Applying proven patterns like Strategy, Factory, and Observer to keep systems extensible without chaos.",
  },
  {
    id: "collections-framework",
    label: "Java Collections Framework",
    category: "industry",
    level: 90,
    emphasis: "secondary",
    description:
      "Choosing the right data structures with clear complexity trade-offs for predictable performance.",
  },
  {
    id: "git",
    label: "Git",
    category: "tools",
    level: 92,
    emphasis: "primary",
    description:
      "Using Git as a safety net and narrative tool for clean, traceable engineering work.",
  },
  {
    id: "github",
    label: "GitHub",
    category: "tools",
    level: 90,
    emphasis: "secondary",
    description:
      "Driving collaboration with pull requests, code reviews, and automation on GitHub.",
  },
  {
    id: "version-control",
    label: "Version Control",
    category: "tools",
    level: 93,
    emphasis: "primary",
    description:
      "Designing branching strategies that support experimentation without sacrificing stability.",
  },
  {
    id: "branching",
    label: "Branching",
    category: "tools",
    level: 88,
    emphasis: "secondary",
    description:
      "Working with feature branches, release branches, and hotfixes with minimal friction.",
  },
  {
    id: "pull-requests",
    label: "Pull Requests",
    category: "tools",
    level: 90,
    emphasis: "secondary",
    description:
      "Treating pull requests as design discussions, not just code diffs, to level up the whole system.",
  },
  {
    id: "repo-management",
    label: "Repository Management",
    category: "tools",
    level: 87,
    emphasis: "secondary",
    description:
      "Structuring repositories and histories so teams can onboard quickly and ship confidently.",
  },
  {
    id: "source-code-management",
    label: "Source Code Management",
    category: "tools",
    level: 89,
    emphasis: "secondary",
    description:
      "Keeping codebases organized with clear module boundaries, reviews, and automation guardrails.",
  },
  {
    id: "ethical-tech",
    label: "Ethical Technology Awareness",
    category: "analytical",
    level: 86,
    emphasis: "secondary",
    description:
      "Thinking critically about impact, bias, and responsibility when deploying modern technologies.",
  },
  {
    id: "ai-literacy",
    label: "AI Literacy",
    category: "analytical",
    level: 88,
    emphasis: "primary",
    description:
      "Understanding AI fundamentals enough to integrate models safely and thoughtfully into systems.",
  },
  {
    id: "decision-making",
    label: "Decision-Making",
    category: "analytical",
    level: 87,
    emphasis: "secondary",
    description:
      "Balancing trade-offs between speed, correctness, and maintainability in real engineering decisions.",
  },
  {
    id: "problem-analysis",
    label: "Problem Analysis",
    category: "analytical",
    level: 90,
    emphasis: "primary",
    description:
      "Breaking down complex issues into understandable, testable components before touching code.",
  },
  {
    id: "analytical-reasoning",
    label: "Analytical Reasoning",
    category: "analytical",
    level: 89,
    emphasis: "secondary",
    description:
      "Following the data, not assumptionsâ€”especially when debugging or designing critical flows.",
  },
  {
    id: "technical-presentation",
    label: "Technical Presentation",
    category: "analytical",
    level: 86,
    emphasis: "secondary",
    description:
      "Explaining complex engineering decisions in language that both technical and non-technical teams can trust.",
  },
  {
    id: "professional-communication",
    label: "Professional Communication",
    category: "analytical",
    level: 88,
    emphasis: "secondary",
    description:
      "Keeping projects moving with clear, written updates, documentation, and alignment.",
  },
  {
    id: "conflict-resolution",
    label: "Conflict Resolution",
    category: "analytical",
    level: 84,
    emphasis: "secondary",
    description:
      "Navigating disagreements around architecture and implementation toward better outcomes, not stalemates.",
  },
];

const ROTATING_KEYWORDS = [
  "Java",
  "OOP",
  "Design Patterns",
  "Git & GitHub",
  "AI Literacy",
  "Analytical Reasoning",
  "Technical Presentation",
];

const categoryLabels: Record<SkillCategory, string> = {
  industry: "Industry Knowledge",
  tools: "Tools & Technologies",
  analytical: "Analytical & Interpersonal",
};

type SkillCardProps = {
  skill: Skill;
  index: number;
  activeCategory: SkillCategory;
};

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.4 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-20, 20], [8, -8]);
  const rotateY = useTransform(x, [-20, 20], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    x.set(((relativeX - centerX) / centerX) * 20);
    y.set(((relativeY - centerY) / centerY) * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const icon =
    skill.category === "industry"
      ? FiCpu
      : skill.category === "tools"
        ? FiGitBranch
        : FiMessageCircle;
  const Icon = icon;

  return (
    <motion.article
      className="float-slow"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.96 }
      }
      transition={{
        duration: 0.65,
        ease: [0.19, 1, 0.22, 1] as const,
        delay: 0.08 + index * 0.03,
      }}
      layout
    >
      <motion.button
        ref={cardRef}
        type="button"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="tilt-card relative flex w-full flex-col items-stretch overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/80 p-4 text-left text-[0.72rem] text-slate-200 shadow-[0_22px_60px_rgba(0,0,0,0.9)] md:p-5"
        style={{ rotateX, rotateY }}
        whileHover={{
          scale: 1.02,
          y: -4,
        }}
        transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] as const }}
      >
        <div className="pointer-events-none absolute inset-px rounded-2xl border border-transparent bg-[radial-gradient(circle_at_0%_0%,rgba(248,250,252,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.3),transparent_55%)] opacity-0 mix-blend-screen blur-[0.3px] transition-opacity duration-400 group-hover:opacity-100" />

        <div className="pointer-events-none absolute -inset-x-16 -top-16 h-24 translate-y-8 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.35),transparent_50%),radial-gradient(circle_at_100%_0%,rgba(251,191,36,0.4),transparent_55%)] opacity-0 blur-3xl transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-80" />

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/90 text-emerald-300 shadow-[0_0_18px_rgba(45,212,191,0.7)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1 + index * 0.04,
                duration: 0.35,
                ease: [0.19, 1, 0.22, 1] as const,
              }}
            >
              <Icon className="h-4 w-4" />
            </motion.div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-emerald-300/90">
                {categoryLabels[skill.category]}
              </p>
              <p className="mt-1 text-[0.88rem] font-semibold text-slate-50 md:text-[0.95rem]">
                <span className="shimmer-text">{skill.label}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-emerald-200">
              {skill.emphasis === "primary" ? "Core" : "Supporting"}
            </span>
            <div className="flex items-center gap-1 text-[0.6rem]">
              <FiTrendingUp className="h-3 w-3 text-emerald-300" />
              <span>{skill.level}%</span>
            </div>
          </div>
        </div>

        <motion.div
          className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800/80"
          initial={{ width: "100%" }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300 shadow-[0_0_25px_rgba(45,212,191,0.9)]"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.18 + index * 0.04,
              ease: [0.19, 1, 0.22, 1] as const,
            }}
          />
        </motion.div>

        <motion.div
          className="relative mt-3 text-[0.7rem] leading-relaxed text-slate-300"
          animate={{
            height: hovered ? "auto" : "2.2rem",
          }}
          transition={{
            duration: 0.3,
            ease: [0.19, 1, 0.22, 1] as const,
          }}
        >
          <p className="line-clamp-2 md:line-clamp-3">
            {skill.description}
          </p>
        </motion.div>
      </motion.button>
    </motion.article>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.4 });

  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("industry");
  const [keywordIndex, setKeywordIndex] = useState(0);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const bgX = useTransform(parallaxX, [-30, 30], [-12, 12]);
  const bgY = useTransform(parallaxY, [-30, 30], [10, -10]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    parallaxX.set(((relativeX - centerX) / centerX) * 30);
    parallaxY.set(((relativeY - centerY) / centerY) * 30);
  };

  const handleMouseLeave = () => {
    parallaxX.set(0);
    parallaxY.set(0);
  };

  const filteredSkills = useMemo(
    () => SKILLS.filter((skill) => skill.category === activeCategory),
    [activeCategory],
  );

  const stats = useMemo(() => {
    return {
      total: SKILLS.length,
      industry: SKILLS.filter((s) => s.category === "industry").length,
      tools: SKILLS.filter((s) => s.category === "tools").length,
      analytical: SKILLS.filter((s) => s.category === "analytical").length,
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative mt-20 scroll-mt-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="skills-bg"
        style={{ x: bgX, y: bgY }}
        aria-hidden="true"
      >
        <div className="skills-bg-grid" />
        <div className="skills-bg-lines" />
        <div className="skills-bg-particles" />
      </motion.div>

      <div className="glass-panel gold-border skills-panel rounded-3xl px-5 py-6 md:px-8 md:py-8">
        <div className="skills-grid-overlay" aria-hidden="true" />

        <header className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/80"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] as const }}
            >
              Technical Expertise
            </motion.p>
            <motion.h2
              className="mt-1 inline-flex items-baseline gap-2 text-lg font-semibold tracking-tight text-slate-50 md:text-xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
              whileHover={{ textShadow: "0 0 24px rgba(251,191,36,0.9)" }}
            >
              <span className="typing-heading text-gradient-gold">
                Hands-on skills that ship real systems.
              </span>
            </motion.h2>
            <motion.div
              className="mt-1 h-[2px] w-10 rounded-full bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-400"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] as const }}
            />
            <AnimatedText
              text="This is the layer where Java, Git, AI fundamentals, and human communication meet to deliver reliable software."
              className="mt-3 max-w-xl text-xs leading-relaxed text-slate-200 md:text-[0.8rem]"
              delay={0.3}
            />
          </div>

          <div className="flex flex-col gap-3 text-[0.7rem] md:min-w-[220px]">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-slate-200 shadow-[0_18px_40px_rgba(0,0,0,0.85)]">
              <div className="flex flex-col">
                <span className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-400">
                  Skills Tracked
                </span>
                <span className="text-lg font-semibold text-gradient-gold">
                  {stats.total}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={keywordIndex}
                  className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-emerald-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] as const }}
                >
                  {ROTATING_KEYWORDS[keywordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[0.62rem] text-slate-300">
              <div className="flex flex-col rounded-xl border border-slate-700/70 bg-slate-950/60 px-2 py-1.5">
                <span className="uppercase tracking-[0.2em] text-slate-400">
                  Industry
                </span>
                <span className="mt-0.5 text-[0.76rem] text-emerald-200">
                  {stats.industry}
                </span>
              </div>
              <div className="flex flex-col rounded-xl border border-slate-700/70 bg-slate-950/60 px-2 py-1.5">
                <span className="uppercase tracking-[0.2em] text-slate-400">
                  Tools
                </span>
                <span className="mt-0.5 text-[0.76rem] text-cyan-200">
                  {stats.tools}
                </span>
              </div>
              <div className="flex flex-col rounded-xl border border-slate-700/70 bg-slate-950/60 px-2 py-1.5">
                <span className="uppercase tracking-[0.2em] text-slate-400">
                  Analytical
                </span>
                <span className="mt-0.5 text-[0.76rem] text-amber-200">
                  {stats.analytical}
                </span>
              </div>
            </div>
          </div>
        </header>

        <motion.div
          className="mt-6 flex flex-wrap items-center gap-2 text-[0.7rem] md:mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] as const }}
        >
          {(["industry", "tools", "analytical"] as SkillCategory[]).map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative overflow-hidden rounded-full border px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-200 ${
                  activeCategory === category
                    ? "border-emerald-300/80 bg-slate-900/90 text-emerald-100"
                    : "border-slate-700/70 bg-slate-950/60 text-slate-300 hover:border-slate-500/80"
                }`}
              >
                <span>{categoryLabels[category]}</span>
                {activeCategory === category && (
                  <motion.span
                    layoutId="skills-tab-indicator"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.28),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.24),transparent_55%)]"
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ),
          )}
        </motion.div>

        <motion.div
          className="relative mt-6 grid gap-4 md:mt-8 md:grid-cols-2 lg:gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                activeCategory={activeCategory}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

