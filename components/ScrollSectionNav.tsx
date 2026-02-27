"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type SectionConfig = {
  id: string;
  label: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const toLabel = (value: string) =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .slice(0, 24);

const isIntersectingHTMLElement = (
  entry: IntersectionObserverEntry,
): entry is IntersectionObserverEntry & { target: HTMLElement } =>
  entry.isIntersecting && entry.target instanceof HTMLElement;

const ScrollSectionNav = () => {
  const pathname = usePathname();
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const sectionElements = Array.from(main.querySelectorAll<HTMLElement>("section"));
    const usedIds = new Set<string>();

    const mappedSections = sectionElements.map((section, index) => {
      let id = section.id.trim();
      const heading = section.querySelector<HTMLElement>("h1, h2, h3");
      const headingLabel = heading?.textContent?.trim() ?? "";
      const fallbackBase = headingLabel ? slugify(headingLabel) : `section-${index + 1}`;

      if (!id) {
        let generatedId = fallbackBase || `section-${index + 1}`;
        let duplicateCounter = 2;
        while (usedIds.has(generatedId) || document.getElementById(generatedId)) {
          generatedId = `${fallbackBase}-${duplicateCounter}`;
          duplicateCounter += 1;
        }
        section.id = generatedId;
        id = generatedId;
      }

      usedIds.add(id);

      const label = section.dataset.navLabel?.trim() || headingLabel || toLabel(id);
      return { id, label };
    });

    const frame = window.requestAnimationFrame(() => {
      setSections(mappedSections);
      setActiveId(mappedSections[0]?.id ?? "");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(isIntersectingHTMLElement)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const bestEntry = visible[0];
        if (bestEntry?.target.id) {
          setActiveId(bestEntry.target.id);
        }
      },
      { root: null, threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!sections.length) return null;

  return (
    <nav aria-label="Section navigation">
      <div className="scroll-nav scroll-nav--desktop">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              className="scroll-nav-item"
              data-active={isActive}
              style={{ ["--section-index" as string]: index } as CSSProperties}
              aria-current={isActive ? "location" : undefined}
              aria-label={`Jump to ${section.label}`}
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
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              className="scroll-nav-dot-btn"
              data-active={isActive}
              aria-current={isActive ? "location" : undefined}
              aria-label={`Jump to ${section.label}`}
              title={section.label}
            >
              <span className="scroll-nav-dot-core" />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ScrollSectionNav;

