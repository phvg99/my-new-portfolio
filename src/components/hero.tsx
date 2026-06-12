"use client";

import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/providers/language-provider";

export function Hero() {
  const t = useTranslation();

  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="flex w-fit max-w-full flex-col">
        <p className="mb-6 text-left font-mono text-sm uppercase tracking-mega text-white/72">
          {t.hero.eyebrow}
        </p>
        <h1
          className={cn(
            "font-display leading-none text-white",
          )}
          style={{ fontSize: "clamp(64px, 12vw, 180px)" }}
        >
          {t.hero.title}
        </h1>
        <p className="mt-8 text-right font-mono text-base leading-relaxed text-white/72 md:text-lg">
          {t.hero.location}
        </p>
      </div>
      <a
        href="#work"
        className="group mt-12 flex flex-col items-center gap-2 font-mono text-sm uppercase tracking-mega text-white/72 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        aria-label={t.hero.scrollAria}
      >
        <ArrowDown className="size-5 animate-scroll-bounce" aria-hidden />
        {t.hero.scroll}
      </a>
    </section>
  );
}
