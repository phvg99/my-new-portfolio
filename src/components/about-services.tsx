"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, useReveal } from "@/lib/motion";
import { useTranslation } from "@/components/providers/language-provider";

export function AboutServices() {
  const t = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, { margin: "-80px" });

  return (
    <>
      {/* About Block */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          ref={ref}
          className="mx-auto max-w-[var(--max-width-container)]"
          variants={stagger}
          {...reveal}
        >
          {/* Label + Paragraph grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr] md:gap-12">
            <motion.p
              className="pt-3 font-mono text-xs uppercase tracking-mega text-yellow"
              variants={fadeUp}
            >
              {t.about.whoLabel}
            </motion.p>

            <motion.p
              className={cn(
                "font-display text-3xl leading-tight text-white",
                "md:text-5xl lg:text-[64px]"
              )}
              variants={fadeUp}
            >
              {t.about.bio}
            </motion.p>
          </div>

        </motion.div>
      </section>
    </>
  );
}
