"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, useReliableInView } from "@/lib/motion";
import { Tilt } from "@/components/ui/tilt";
import { PROJECTS, type Project } from "@/lib/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={fadeUp}>
      <Link href={`/work/${project.id}`} className="block">
      <Tilt rotationFactor={8} isReverse className="cursor-pointer">
        <div
          className={cn(
            "flex flex-col overflow-hidden rounded-xl",
            "border border-zinc-950/10 bg-white",
            "dark:border-zinc-50/10 dark:bg-zinc-900"
          )}
        >
          {/* Project thumbnail */}
          <div className="relative aspect-video">
            <Image
              src={project.thumbnailUrl}
              alt={project.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Metadata */}
          <div className="p-3">
            <h3 className="text-sm font-medium tracking-heading text-foreground">
              {project.name}
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-400">
              {project.tags[0]}
            </p>
          </div>
        </div>
      </Tilt>
      </Link>
    </motion.div>
  );
}

export function SelectedProjects() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useReliableInView(headingRef, { margin: "-40px" });

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useReliableInView(gridRef, { margin: "-80px" });

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.h2
          ref={headingRef}
          className={cn(
            "text-3xl tracking-heading text-foreground",
            "md:text-4xl lg:text-5xl",
            "mb-12 md:mb-16"
          )}
          variants={fadeUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          Selected projects
        </motion.h2>

        {/* Project grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
          variants={stagger}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
