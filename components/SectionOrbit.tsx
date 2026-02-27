"use client";

import { motion } from "framer-motion";

type SectionOrbitProps = {
  label: string;
  items: string[];
};

const SectionOrbit = ({ label, items }: SectionOrbitProps) => {
  const radius = 64;

  return (
    <motion.div
      className="relative mx-auto h-44 w-44 rounded-full bg-[radial-gradient(circle_at_30%_0%,rgba(251,191,36,0.25),transparent_60%),radial-gradient(circle_at_70%_100%,rgba(56,189,248,0.15),transparent_60%),rgba(15,23,42,0.96)] shadow-[0_0_40px_rgba(15,23,42,0.9)] ring-1 ring-amber-300/40 sm:h-52 sm:w-52 md:h-56 md:w-56"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-8 rounded-full border border-amber-200/25" />
      <div className="absolute inset-14 rounded-full border border-slate-500/30" />

      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-slate-950/90 text-center text-[0.62rem] text-slate-100 shadow-[0_0_25px_rgba(15,23,42,0.9)] ring-1 ring-amber-300/50 sm:h-20 sm:w-20 sm:text-[0.7rem]">
        <span className="mb-1 h-1 w-8 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-300" />
        <span className="max-w-[4.5rem] truncate px-2 uppercase tracking-[0.18em] text-[0.55rem] text-amber-100/90 sm:max-w-[5.5rem] sm:text-[0.6rem]">
          {label}
        </span>
      </div>

      {items.map((item, index) => {
        const angle = (index / items.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={item}
            className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 * index, duration: 0.4, ease: [0.19, 1, 0.22, 1] as const }}
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            }}
          >
            <div className="max-w-[5.8rem] truncate rounded-full bg-slate-900/90 px-2 py-1 text-[0.58rem] text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.35)] ring-1 ring-amber-300/40 sm:max-w-[7.5rem] sm:px-2.5 sm:text-[0.65rem]">
              {item}
            </div>
          </motion.div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_0%_0%,rgba(251,191,36,0.4),transparent_55%)] opacity-40 mix-blend-screen" />
    </motion.div>
  );
};

export default SectionOrbit;

