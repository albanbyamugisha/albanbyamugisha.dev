"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeSwitcher from "./ThemeSwitcher";
import LiveStatus from "./LiveStatus";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/architecture", label: "Architecture" },
  { href: "/security", label: "Security" },
  { href: "/devops", label: "DevOps" },
  { href: "/open-source", label: "Open Source" },
  { href: "/contact", label: "Contact" },
];

const itemVariants = {
  initial: { opacity: 0, y: -10 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 * index,
      duration: 0.35,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  }),
};

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between gap-4 px-4 py-3 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center gap-3">
          <motion.div
            className="gold-border relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-300/90 via-amber-500/90 to-yellow-500/90 shadow-[0_0_45px_rgba(245,215,110,0.9)] sm:h-12 sm:w-12 md:h-14 md:w-14 md:rounded-3xl"
            initial={{ scale: 0.85, opacity: 0, rotate: -6 }}
            animate={{ scale: [1, 1.05, 1.02, 1], opacity: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{
              duration: 3.6,
              ease: [0.19, 1, 0.22, 1] as const,
              repeat: Infinity,
              repeatDelay: 1.6,
            }}
          >
            <Image
              src="/images/Alban.png"
              alt="Byamugisha Alban"
              fill
              sizes="72px"
              className="object-cover object-center portrait-glow"
              priority
            />
          </motion.div>
          <div className="hidden flex-col sm:flex">
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-amber-100/80 md:text-xs">
              Software Engineer
            </span>
            <span className="text-[0.7rem] font-mono font-semibold uppercase tracking-[0.18em] text-slate-100 md:text-sm md:tracking-[0.22em]">
              BYAMUGISHA ALBAN
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-700/70 bg-slate-900/70 px-2 py-1 text-xs text-slate-200 shadow-[0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl xl:flex">
          {navItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <motion.div
                key={item.href}
                custom={index}
                variants={itemVariants}
                initial="initial"
                animate="animate"
              >
                <Link
                  href={item.href}
                  className={`relative inline-flex items-center rounded-full px-3 py-1 transition-colors ${
                    isActive
                      ? "bg-amber-300/90 text-slate-950"
                      : "text-slate-200/85 hover:bg-slate-800/80"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-amber-300"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LiveStatus />
          </div>
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((previous) => !previous)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/75 text-slate-100 shadow-[0_12px_28px_rgba(0,0,0,0.8)] transition-colors hover:border-amber-300/80 hover:text-amber-100 xl:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-site-nav"
          >
            {mobileOpen ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-site-nav"
          className="border-t border-slate-800/80 bg-slate-950/90 px-4 pb-4 pt-3 backdrop-blur-xl sm:px-5 md:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-[88rem] space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl border px-3 py-2 text-[0.68rem] uppercase tracking-[0.15em] transition-colors ${
                      isActive
                        ? "border-amber-300/90 bg-amber-300/90 text-slate-950"
                        : "border-slate-700/80 bg-slate-900/70 text-slate-100 hover:border-amber-300/80 hover:text-amber-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-2.5">
              <ThemeSwitcher />
              <LiveStatus />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

