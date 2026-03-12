"use client";

import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.main
        className="flex flex-col items-center gap-6 px-8 text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-serif text-5xl font-bold tracking-tight text-foreground md:text-7xl"
          variants={fadeUp}
        >
          Portfolio OS
        </motion.h1>
        <motion.p
          className="max-w-md text-lg text-muted-foreground"
          variants={fadeUp}
        >
          Senior Product Designer — crafting scalable, user-centric digital
          experiences.
        </motion.p>
        <motion.div
          className="mt-4 rounded-full border border-border px-6 py-2 text-sm text-muted-foreground"
          variants={fadeUp}
        >
          Phase 1 — Foundation
        </motion.div>
      </motion.main>
    </div>
  );
}
