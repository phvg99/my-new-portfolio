"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLanguage } from "@/components/providers/language-provider";

/* Section ids on the home page mapped to their nav href (top → bottom).
   The first entry has no matching element — it's the default (hero / top). */
const navSections = [
  { id: "__top", href: "/" },
  { id: "work", href: "/#work" },
  { id: "about", href: "/#about" },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const navVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
};

const linkClass = "font-mono text-sm uppercase tracking-loose text-white transition-colors hover:text-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer";

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useActiveSection(navSections);
  const reduceMotion = useReducedMotion();
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.work, href: "/#work" },
    { label: t.nav.about, href: "/#about" },
  ];

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  const isActive = (href: string) => href === activeHref;

  /* Snappy spring slide; jump instantly when reduced motion is requested. */
  const indicatorTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 400, damping: 30 };

  return (
    <motion.header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "bg-blue-deep border-border" : "bg-transparent border-transparent"
      )}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <nav
        className="mx-auto grid max-w-[var(--max-width-container)] grid-cols-2 items-center px-6 py-5 md:grid-cols-3"
        aria-label={t.nav.mainNavAria}
      >
        <Link
          href="/"
          className="justify-self-start font-mono text-sm uppercase tracking-mega text-white hover:text-yellow"
        >
          {t.nav.brand}
        </Link>

        {/* Desktop Links — centered */}
        <div className="hidden items-center gap-8 md:flex md:justify-self-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveHref(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(linkClass, "relative", isActive(link.href) && "text-yellow")}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 right-0 left-0 h-0.5 bg-yellow"
                  transition={indicatorTransition}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Language Switcher */}
        <div className="hidden items-center gap-3 md:flex md:justify-self-end">
          <button
            type="button"
            onClick={() => setLocale("pt")}
            aria-pressed={locale === "pt"}
            aria-label={t.nav.switchToPortuguese}
            className={cn(linkClass, locale === "pt" ? "text-white" : "text-white/50")}
          >
            PT
          </button>
          <span aria-hidden className="text-white/30">
            /
          </span>
          <button
            type="button"
            onClick={() => setLocale("en")}
            aria-pressed={locale === "en"}
            aria-label={t.nav.switchToEnglish}
            className={cn(linkClass, locale === "en" ? "text-white" : "text-white/50")}
          >
            EN
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center justify-self-end font-mono text-lg text-white transition-colors hover:text-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
          aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "×" : "▼"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="overflow-hidden border-t border-border bg-blue md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveHref(link.href);
                    setMobileOpen(false);
                  }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(linkClass, "inline-block w-fit", isActive(link.href) && "nav-active")}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setLocale("pt")}
                  aria-pressed={locale === "pt"}
                  aria-label={t.nav.switchToPortuguese}
                  className={cn(linkClass, locale === "pt" ? "text-white" : "text-white/50")}
                >
                  PT
                </button>
                <span aria-hidden className="text-white/30">
                  /
                </span>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  aria-pressed={locale === "en"}
                  aria-label={t.nav.switchToEnglish}
                  className={cn(linkClass, locale === "en" ? "text-white" : "text-white/50")}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
