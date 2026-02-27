"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useThemeMode } from "@/context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { RiVipCrown2Line } from "react-icons/ri";

const modeIconMap: Record<
  ReturnType<typeof useThemeMode>["mode"],
  ReactNode
> = {
  gold: <RiVipCrown2Line className="h-4 w-4 text-amber-300" />,
  dark: <FiMoon className="h-4 w-4 text-slate-100" />,
  light: <FiSun className="h-4 w-4 text-yellow-400" />,
};

const modeOrder: {
  id: ReturnType<typeof useThemeMode>["mode"];
  label: string;
}[] = [
  { id: "gold", label: "Default" },
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
];

export const ThemeSwitcher = () => {
  const { mode, setMode } = useThemeMode();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-slate-900/70 px-1.5 py-1 text-xs text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-md">
      {modeOrder.map((entry) => {
        const isActive = mode === entry.id;
        return (
          <motion.button
            key={entry.id}
            type="button"
            onClick={() => setMode(entry.id)}
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[0.65rem] uppercase tracking-[0.16em] ${
              isActive
                ? "bg-amber-300/90 text-slate-950"
                : "text-amber-100/85 hover:bg-slate-800/80"
            }`}
            whileHover={{ scale: isActive ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-slate-950/80 ring-1 ring-amber-300/40">
              {modeIconMap[entry.id]}
            </span>
            <span>{entry.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;

