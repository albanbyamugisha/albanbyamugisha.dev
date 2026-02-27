"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type SectionConfig = {
  id: string;
  label: string;
  variant: "overview" | "activity" | "skills" | "education" | "certifications";
};

const SECTIONS: SectionConfig[] = [
  { id: "overview", label: "Overview", variant: "overview" },
  { id: "activity", label: "Activity", variant: "activity" },
  { id: "skills", label: "Skills", variant: "skills" },
  { id: "education", label: "Education", variant: "education" },
  { id: "certifications", label: "Certs", variant: "certifications" },
];

const isIntersectingHTMLElement = (
  entry: IntersectionObserverEntry,
): entry is IntersectionObserverEntry & { target: HTMLElement } =>
  entry.isIntersecting && entry.target instanceof HTMLElement;

const ScrollSectionNav = () => {
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: (IntersectionObserverEntry & { target: HTMLElement }) | null = null;

        for (const entry of entries) {
          if (!isIntersectingHTMLElement(entry)) continue;
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }

        if (bestEntry) {
          const { id } = bestEntry.target;
          if (id && id !== activeId) {
            setActiveId(id);
          }
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
      },
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="scroll-nav scroll-nav--desktop">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              className="scroll-nav-item"
              data-section={section.variant}
              data-active={isActive}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.18, ease: [0.19, 1, 0.22, 1] as const }}
            >
              <span className="scroll-nav-label">{section.label}</span>
              <span className="scroll-nav-orbit" />
            </motion.button>
          );
        })}
      </div>

      <div className="scroll-nav scroll-nav--mobile">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              className="scroll-nav-dot-btn"
              data-section={section.variant}
              data-active={isActive}
            >
              <span className="scroll-nav-dot-core" />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ScrollSectionNav;

