"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LiveStatus = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-UG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Africa/Kampala",
      });
      setTime(formatter.format(now));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] as const }}
      className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-400/60 via-cyan-300/40 to-emerald-400/60 p-[1px] shadow-[0_0_22px_rgba(34,197,94,0.35),0_16px_40px_rgba(3,7,18,0.65)]"
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/60 px-3 py-1.5 text-[0.7rem] sm:text-[0.75rem] text-emerald-50/90 backdrop-blur-xl">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-50" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(34,197,94,0.9)]" />
        </span>
        <span className="font-['Orbitron'] uppercase tracking-[0.18em] text-emerald-50/85">
          Live | Western Uganda | {time || "..."}
        </span>
      </div>
    </motion.div>
  );
};

export default LiveStatus;
