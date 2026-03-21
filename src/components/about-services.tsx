"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, useReliableInView } from "@/lib/motion";

export function AboutServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useReliableInView(ref, { margin: "-80px" });

  return (
    <>
      {/* About Block */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          ref={ref}
          className="mx-auto max-w-7xl"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Label + Paragraph grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr] md:gap-12">
            <motion.p
              className={cn(
                "text-sm uppercase tracking-widest text-muted-foreground",
                "pt-2"
              )}
              variants={fadeUp}
            >
              Who I am
            </motion.p>

            <motion.p
              className={cn(
                "text-2xl font-normal leading-snug tracking-heading text-foreground",
                "md:text-3xl lg:text-4xl"
              )}
              variants={fadeUp}
            >
              I&apos;m a designer passionate about creating user-focused
              digital solutions. Whether it&apos;s a bold website or a detailed
              product app, I&apos;m here to make ideas shine and create
              impactful experiences.
            </motion.p>
          </div>

        </motion.div>
      </section>
    </>
  );
}
