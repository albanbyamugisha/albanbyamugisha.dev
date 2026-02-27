"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const IntroBoomImage = () => {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(frameRef, { amount: 0.45, once: true });

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-[1.75rem] border border-amber-300/50 bg-slate-950/70 shadow-[0_28px_80px_rgba(0,0,0,0.85)]"
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/90 blur-md"
          initial={{ scale: 0.1, opacity: 0 }}
          animate={isInView ? { scale: 9, opacity: [0, 1, 0] } : { scale: 0.1, opacity: 0 }}
          transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/95"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={isInView ? { scale: 20, opacity: [0, 0.85, 0] } : { scale: 0.2, opacity: 0 }}
          transition={{ duration: 0.84, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(56,189,248,0.45)_0%,rgba(14,116,144,0.24)_38%,transparent_70%)] mix-blend-screen"
          initial={{ opacity: 0, scale: 0.65 }}
          animate={
            isInView
              ? { opacity: [0, 0.95, 0], scale: [0.65, 1.35, 1.5] }
              : { opacity: 0, scale: 0.65 }
          }
          transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1], delay: 0.02 }}
        />
        <motion.div
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.26,
                  clipPath: "inset(24% 18% 22% 18% round 2rem)",
                  filter: "blur(14px)",
                }
          }
          animate={
            reduceMotion
              ? { opacity: isInView ? 1 : 0 }
              : {
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 1.26,
                  clipPath: isInView
                    ? "inset(0% 0% 0% 0% round 0.9rem)"
                    : "inset(24% 18% 22% 18% round 2rem)",
                  filter: isInView ? "blur(0px)" : "blur(14px)",
                }
          }
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="relative h-[54vh] min-h-[360px] w-full md:h-[76vh] md:min-h-[560px]"
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={
              !isInView
                ? { opacity: 0 }
                : reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: [0.92, 1, 0.96, 1],
                      scale: [1, 1.02, 1.01, 1],
                      x: [0, -8, 6, 0],
                      y: [0, 4, -4, 0],
                      rotate: [0, -0.3, 0.25, 0],
                    }
            }
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: !isInView || reduceMotion ? 0 : Infinity,
              repeatType: "mirror",
              delay: 0.95,
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src="/images/B@Alban.png"
                alt="Byamugisha Alban main intro image"
                fill
                priority
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-[-30%] w-[38%] bg-[linear-gradient(90deg,transparent_0%,rgba(34,211,238,0.25)_50%,transparent_100%)] mix-blend-screen"
            animate={
              !isInView || reduceMotion
                ? { opacity: 0, x: "0%" }
                : {
                    x: ["0%", "290%"],
                    opacity: [0, 0.85, 0],
                  }
            }
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              delay: 0.95,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(250,250,250,0.36),transparent_50%)] mix-blend-screen" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default IntroBoomImage;
