"use client";

import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 pb-6 pt-6 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between lg:px-6">
        <div className="space-y-1.5">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="text-[0.74rem] uppercase tracking-[0.18em] text-amber-100/80"
          >
            Engineering the next generation of secure, intelligent systems.
          </motion.p>
          <p>
            © {year} Byamugisha Alban. Crafted with a gold-standard engineering
            mindset.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-end">
          <SocialLinks variant="full" />
          <p className="text-[0.7rem] text-slate-500">
            Western Region, Uganda · Available for remote and hybrid
            engagements.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

