"use client";

import { motion } from "motion/react";
import { Navigation } from "@/components/navigation";
import { AboutServices } from "@/components/about-services";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { Footer } from "@/components/footer";
import { SubpageLayout } from "@/components/subpage-layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function AboutPage() {
  return (
    <SubpageLayout>
      <Navigation />
      <main className="pt-24">
        <AboutServices />
        <hr className="border-border mx-auto max-w-container" />
        <section className="bg-background text-foreground py-12 sm:py-24 md:py-32">
          <motion.div
            className="mx-auto flex max-w-[var(--max-width-container)] flex-col items-center gap-4 text-center sm:gap-16 px-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div className="flex flex-col items-center gap-4 sm:gap-8" variants={fadeUp}>
              <h2 className="max-w-[720px] text-3xl font-normal leading-tight tracking-heading sm:text-5xl sm:leading-tight">
                What people are saying
              </h2>
              <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
                Colleagues, collaborators, and clients on working together.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto max-w-[var(--max-width-container)] mt-8 sm:mt-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <StaggerTestimonials />
          </motion.div>
        </section>
      </main>
      <hr className="border-border mx-auto max-w-container" />
      <Footer />
    </SubpageLayout>
  );
}
