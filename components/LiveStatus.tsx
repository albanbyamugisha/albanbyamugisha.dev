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
      className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-slate-900/80 px-2.5 py-1 text-[0.7rem] text-emerald-100 shadow-[0_12px_30px_rgba(0,0,0,0.7)] backdrop-blur-md"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.9)]" />
      </span>
      <span className="uppercase tracking-[0.16em] text-emerald-100/80">
        Live Â· Western Uganda Â· {time || "..."}
      </span>
    </motion.div>
  );
};

export default LiveStatus;

