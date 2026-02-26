"use client";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTelegram,
  FaDiscord,
  FaXTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";

type SocialLinksProps = {
  variant?: "compact" | "full";
};

const links = [
  {
    id: "github",
    icon: FaGithub,
    href: "https://github.com/albanbyaugisha",
    label: "GitHub",
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/byamugisha-alban-3140bb37a",
    label: "LinkedIn",
  },
  {
    id: "youtube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@albanbyaugisha",
    label: "YouTube",
  },
  {
    id: "telegram",
    icon: FaTelegram,
    href: "https://t.me/albanbyaugisha",
    label: "Telegram",
  },
  {
    id: "discord",
    icon: FaDiscord,
    href: "https://discord.com/users/albanbyaugisha",
    label: "Discord",
  },
  {
    id: "x",
    icon: FaXTwitter,
    href: "https://x.com/albanbyaugisha",
    label: "X",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    href: "https://instagram.com/albanbyaugisha",
    label: "Instagram",
  },
  {
    id: "phone",
    icon: FiPhone,
    href: "tel:+256748611252",
    label: "Phone",
  },
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    href: "https://wa.me/256748611252",
    label: "WhatsApp",
  },
];

const SocialLinks = ({ variant = "full" }: SocialLinksProps) => {
  const visibleLinks = variant === "compact" ? links.slice(0, 4) : links;

  return (
    <div className="flex items-center gap-2">
      {visibleLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.id}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.03 * index,
              duration: 0.3,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-slate-200 shadow-[0_0_25px_rgba(0,0,0,0.7)] ring-1 ring-amber-300/40 backdrop-blur-md"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300/25 via-amber-500/15 to-transparent opacity-0 blur group-hover:opacity-100" />
            <Icon className="h-4 w-4 group-hover:text-amber-200" />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

