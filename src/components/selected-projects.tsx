"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { assetPath, cn } from "@/lib/utils";
import { fadeUp, stagger, useReveal } from "@/lib/motion";
import { getProjects, type Project } from "@/lib/projects";
import { useLanguage } from "@/components/providers/language-provider";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const label = `${String(index + 1).padStart(2, "0")} / ${project.tags[0]}`;

  return (
    <motion.div
      variants={fadeUp}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.12 }}
    >
      <Link
        href={`/work/${project.id}`}
        className="group block border border-border"
      >
        {/* Project thumbnail — landscape */}
        <div className="relative aspect-video overflow-hidden bg-blue-deep">
          <Image
            src={assetPath(project.thumbnailUrl)}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Metadata footer — transparent by default, yellow fill on hover */}
        <div
          className={cn(
            "flex flex-col gap-1.5 bg-transparent p-4 text-white",
            "transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:bg-yellow group-hover:text-blue",
          )}
        >
          <span className="font-mono text-xs uppercase tracking-loose text-yellow transition-colors duration-200 group-hover:text-blue">
            {label}
          </span>
          <h3 className="font-mono text-lg font-medium leading-snug text-white transition-colors duration-200 group-hover:text-blue md:text-xl">
            {project.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export function SelectedProjects() {
  const { locale, t } = useLanguage();
  const projects = getProjects(locale);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingReveal = useReveal(headingRef, { margin: "-40px" });

  const gridRef = useRef<HTMLDivElement>(null);
  const gridReveal = useReveal(gridRef, { margin: "-80px" });

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[var(--max-width-container)]">
        {/* Section heading */}
        <motion.h2
          ref={headingRef}
          className="mb-12 font-display text-5xl text-white md:mb-16 md:text-7xl"
          variants={fadeUp}
          {...headingReveal}
        >
          {t.projects.heading}
        </motion.h2>

        {/* Project grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
          variants={stagger}
          {...gridReveal}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
