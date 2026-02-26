"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import LiveStatus from "./LiveStatus";
import SocialLinks from "./SocialLinks";

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
      ease: [0.19, 1, 0.22, 1],
    },
  }),
};

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="gold-border relative h-14 w-14 overflow-hidden rounded-3xl bg-gradient-to-br from-amber-300/90 via-amber-500/90 to-yellow-500/90 shadow-[0_0_45px_rgba(245,215,110,0.9)]"
            initial={{ scale: 0.85, opacity: 0, rotate: -6 }}
            animate={{ scale: [1, 1.05, 1.02, 1], opacity: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{
              duration: 3.6,
              ease: [0.19, 1, 0.22, 1],
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
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.18em] text-amber-100/80">
              Software Engineer
            </span>
            <span className="text-sm font-mono font-semibold uppercase tracking-[0.22em] text-slate-100">
              BYAMUGISHA ALBAN
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-700/70 bg-slate-900/70 px-2 py-1 text-xs text-slate-200 shadow-[0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl md:flex">
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
          <div className="hidden sm:block">
            <LiveStatus />
          </div>
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <div className="hidden lg:block">
            <SocialLinks variant="compact" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

