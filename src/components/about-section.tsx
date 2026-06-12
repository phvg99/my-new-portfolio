"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { AboutServices } from "@/components/about-services";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { fadeUp, stagger, useReliableInView } from "@/lib/motion";
import { useTranslation } from "@/components/providers/language-provider";

export function AboutSection() {
  const t = useTranslation();
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useReliableInView(headingRef, { margin: "-80px" });

  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialInView = useReliableInView(testimonialRef, { margin: "-80px" });

  return (
    <section id="about" className="scroll-mt-24">
      <AboutServices />
      <div className="mx-auto max-w-[var(--max-width-container)] px-6">
        <hr className="border-0 border-t border-border" />
      </div>
      <section className="py-12 text-white sm:py-24 md:py-32">
        <motion.div
          ref={headingRef}
          className="mx-auto flex max-w-[var(--max-width-container)] flex-col items-center gap-4 text-center sm:gap-16 px-4"
          variants={stagger}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          <motion.div className="flex flex-col items-center gap-4 sm:gap-8" variants={fadeUp}>
            <h2 className="max-w-[720px] font-display text-4xl leading-tight text-white sm:text-6xl sm:leading-tight">
              {t.about.testimonialsHeading}
            </h2>
            <p className="max-w-[600px] font-mono text-base text-white/72 sm:text-lg">
              {t.about.testimonialsSubtitle}
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          ref={testimonialRef}
          className="mt-8 sm:mt-16"
          variants={fadeUp}
          initial="hidden"
          animate={testimonialInView ? "visible" : "hidden"}
        >
          <StaggerTestimonials />
        </motion.div>
      </section>
    </section>
  );
}
