"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Navigation } from "@/components/navigation";
import { AboutServices } from "@/components/about-services";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { Footer } from "@/components/footer";
import { SubpageLayout } from "@/components/subpage-layout";
import { WavePath } from "@/components/ui/wave-path";
import { fadeUp, stagger, useReliableInView } from "@/lib/motion";

export default function AboutPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useReliableInView(headingRef, { margin: "-80px" });

  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialInView = useReliableInView(testimonialRef, { margin: "-80px" });

  return (
    <SubpageLayout>
      <Navigation />
      <main className="pt-24">
        <AboutServices />
        <div className="flex items-center justify-center">
          <WavePath className="text-white/30" />
        </div>
        <section className="text-foreground py-12 sm:py-24 md:py-32">
          <motion.div
            ref={headingRef}
            className="mx-auto flex max-w-[var(--max-width-container)] flex-col items-center gap-4 text-center sm:gap-16 px-4"
            variants={stagger}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            <motion.div className="flex flex-col items-center gap-4 sm:gap-8" variants={fadeUp}>
              <h2 className="max-w-[720px] text-3xl font-normal leading-tight tracking-heading sm:text-5xl sm:leading-tight">
                What my friends are saying
              </h2>
              <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
                Colleagues and collaborators on working together.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            ref={testimonialRef}
            className="mx-auto max-w-[var(--max-width-container)] mt-8 sm:mt-16"
            variants={fadeUp}
            initial="hidden"
            animate={testimonialInView ? "visible" : "hidden"}
          >
            <StaggerTestimonials />
          </motion.div>
        </section>
      </main>
      <hr className="border-white/15 mx-auto max-w-container shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
      <Footer />
    </SubpageLayout>
  );
}
