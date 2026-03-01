"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const ProfileReveal = () => {
  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
      <motion.div
        className="relative h-40 w-40 shrink-0 rounded-3xl bg-gradient-to-br from-amber-200 via-amber-500 to-yellow-500 p-[2px] shadow-[0_0_60px_rgba(245,215,110,0.9)] md:h-48 md:w-48"
        initial={{ scale: 0.6, opacity: 0, rotate: -8, filter: "blur(6px)" }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: 0,
          filter: "blur(0px)",
        }}
        whileHover={{ scale: 1.04, rotate: 1.2 }}
        transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] as const }}
      >
        <motion.div
          className="glass-panel relative flex h-full w-full overflow-hidden rounded-[1.35rem] bg-slate-950/80"
          initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
          animate={{
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.85), 0 0 80px rgba(212,175,55,0.5)",
          }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-[radial-gradient(circle_at_0%_0%,rgba(250,250,250,0.28),transparent_55%)] opacity-60 mix-blend-screen" />
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[1.35rem] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-amber-300/18 to-transparent mix-blend-screen"
              animate={{ y: ["-100%", "120%"] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: [0.19, 1, 0.22, 1] as const,
              }}
            />
          </motion.div>
          <div className="relative z-10 h-full w-full">
            <Image
              src="/images/profile-alban.png"
              alt="Portrait of Byamugisha Alban"
              fill
              sizes="(min-width: 768px) 12rem, 10rem"
              className="object-cover object-center portrait-glow"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="space-y-3 md:space-y-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] as const, delay: 0.2 }}
      >
        <AnimatedText
          text="Byamugisha Alban"
          className="text-3xl font-semibold tracking-tight text-gradient-gold md:text-4xl"
        />
        <p className="max-w-xl text-sm leading-relaxed text-slate-200">
          I design and develop secure, scalable, and user-centric software
          systems-bridging high-level architecture with precise front-end
          execution. Every interface, API, and deployment pipeline is treated as
          part of a cohesive engineering story.
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-amber-100/80">
          Software Engineer · System Design · Frontend Architecture · DevSecOps
        </p>
      </motion.div>
    </div>
  );
};

export default ProfileReveal;
