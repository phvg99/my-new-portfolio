"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, useReliableInView } from "@/lib/motion";
import type { CaseStudyData, FeatureModule } from "@/lib/projects";
import { WavePath } from "@/components/ui/wave-path";
import { ImageCarousel } from "@/components/ui/image-carousel";

function ImagePlaceholder({
  bgColor,
  aspect = "aspect-video",
}: {
  bgColor: string;
  aspect?: string;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div
        className={cn(aspect, "w-full rounded-xl")}
        style={{ backgroundColor: bgColor }}
      />
    </motion.div>
  );
}

function ProjectImage({
  src,
  alt,
  aspect = "aspect-video",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
}: {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div
        className={cn(
          aspect,
          "relative w-full overflow-hidden rounded-xl"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="text-sm uppercase tracking-widest text-muted-foreground"
      variants={fadeUp}
    >
      {children}
    </motion.p>
  );
}

function FeatureModuleSection({
  feature,
}: {
  feature: FeatureModule;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useReliableInView(ref, { margin: "-80px" });

  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Module header */}
        <motion.p
          className="text-sm uppercase tracking-widest text-muted-foreground"
          variants={fadeUp}
        >
          Module {String(feature.moduleNumber).padStart(2, "0")}
        </motion.p>
        <motion.h2
          className={cn(
            "mt-2 text-3xl tracking-heading text-foreground",
            "md:text-4xl lg:text-5xl"
          )}
          variants={fadeUp}
        >
          {feature.title}
        </motion.h2>
        <motion.p
          className="mt-3 text-lg text-muted-foreground md:text-xl"
          variants={fadeUp}
        >
          {feature.subtitle}
        </motion.p>

        {/* Problem context */}
        <motion.p
          className="mt-8 max-w-3xl text-muted-foreground tracking-body"
          variants={fadeUp}
        >
          {feature.problem}
        </motion.p>

        {/* Sub-features grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
          variants={stagger}
        >
          {feature.subFeatures.map((sf, i) => (
            <motion.div
              key={i}
              className={cn("rounded-xl border border-border p-6", "bg-card")}
              variants={fadeUp}
            >
              <h4 className="text-base font-medium tracking-heading text-foreground">
                {sf.title}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground tracking-body">
                {sf.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Module image */}
        <div className="mt-12">
          <ProjectImage
            src={feature.imageUrl}
            alt={`${feature.title} screenshot`}
            aspect="aspect-[16/9]"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        {/* Result metric callout */}
        <motion.div
          className={cn(
            "mt-12 rounded-xl p-8",
            "bg-card border border-border"
          )}
          variants={fadeUp}
        >
          <p
            className={cn(
              "text-2xl font-medium tracking-heading text-foreground",
              "md:text-3xl"
            )}
          >
            {feature.result.metric}
          </p>
          <p className="mt-3 text-muted-foreground tracking-body">
            {feature.result.description}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SolutionSection({
  solution,
  bgColor,
}: {
  solution: CaseStudyData["solutions"][number];
  bgColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useReliableInView(ref, { margin: "-80px" });

  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl"
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: solution text */}
          <div>
            <motion.h2
              className={cn(
                "text-3xl tracking-heading text-foreground",
                "md:text-4xl"
              )}
              variants={fadeUp}
            >
              {solution.title}
            </motion.h2>
            <motion.p
              className="mt-6 text-lg tracking-body text-muted-foreground md:text-xl"
              variants={fadeUp}
            >
              {solution.description}
            </motion.p>
          </div>

          {/* Right: image */}
          {solution.imageUrls ? (
            <motion.div variants={fadeUp}>
              <ImageCarousel
                images={solution.imageUrls}
                alt={solution.title}
              />
            </motion.div>
          ) : solution.imageUrl ? (
            <ProjectImage
              src={solution.imageUrl}
              alt={solution.title}
            />
          ) : (
            <ImagePlaceholder bgColor={bgColor} />
          )}
        </div>
      </motion.div>
    </section>
  );
}

export function CaseStudyContent({ data }: { data: CaseStudyData }) {
  const { project } = data;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useReliableInView(headerRef, { margin: "-80px" });

  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useReliableInView(problemRef, { margin: "-80px" });

  const resultsRef = useRef<HTMLDivElement>(null);
  const resultsInView = useReliableInView(resultsRef, { margin: "-80px" });

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-6 pt-28">
        <nav className="mx-auto max-w-7xl" aria-label="Breadcrumb">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-sm tracking-widest text-muted-foreground"
          >
            <Link
              href="/work"
              className="transition-colors hover:text-foreground"
            >
              Work
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{project.name}</span>
          </motion.p>
        </nav>
      </div>

      {/* Project Header */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          ref={headerRef}
          className="mx-auto max-w-7xl"
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left: text */}
            <div>
              <motion.h1
                className={cn(
                  "text-4xl tracking-display text-foreground",
                  "md:text-6xl lg:text-7xl"
                )}
                variants={fadeUp}
              >
                {project.name}
              </motion.h1>

              <motion.p
                className="mt-6 text-lg tracking-body text-muted-foreground md:text-xl"
                variants={fadeUp}
              >
                {data.description}
              </motion.p>

              {/* Metadata */}
              <motion.dl className="mt-8 space-y-4" variants={fadeUp}>
                <div>
                  <dt className="text-sm uppercase tracking-widest text-muted-foreground">
                    Role
                  </dt>
                  <dd className="mt-1 text-foreground">{data.role}</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-widest text-muted-foreground">
                    Client
                  </dt>
                  <dd className="mt-1 text-foreground">{data.client}</dd>
                </div>
                {data.website && (
                  <div>
                    <dt className="text-sm uppercase tracking-widest text-muted-foreground">
                      Website link
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-muted-foreground"
                      >
                        {data.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        <ArrowUpRight size={14} />
                      </a>
                    </dd>
                  </div>
                )}
              </motion.dl>
            </div>

            {/* Right: image */}
            <ProjectImage
              src={project.thumbnailUrl}
              alt={project.name}
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Main Problem */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          ref={problemRef}
          className="mx-auto max-w-7xl"
          variants={stagger}
          initial="hidden"
          animate={problemInView ? "visible" : "hidden"}
        >
          <div className={cn("grid grid-cols-1 gap-8", data.mainProblemImageUrl && "lg:grid-cols-2 lg:gap-16")}>
            {/* Left: problem details */}
            <div>
              <SectionLabel>Main Problem</SectionLabel>
              <motion.p
                className="mt-4 text-lg tracking-body text-muted-foreground md:text-xl"
                variants={fadeUp}
              >
                {data.mainProblem.description}
              </motion.p>

              {/* Mini problems */}
              <div className="mt-10 space-y-8">
                {data.mainProblem.miniProblems.map((mini, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <h3 className="text-lg font-medium tracking-heading text-foreground">
                      {mini.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground tracking-body">
                      {mini.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: image */}
            {data.mainProblemImageUrl && (
              <ProjectImage
                src={data.mainProblemImageUrl}
                alt={`${project.name} — main problem`}
              />
            )}
          </div>
        </motion.div>
      </section>

      {/* Feature Modules — multi-feature case studies */}
      {data.features &&
        data.features.length > 0 &&
        data.features.map((feature) => (
          <div key={feature.moduleNumber}>
            <div className="flex items-center justify-center">
              <WavePath className="text-white/30" />
            </div>
            <FeatureModuleSection feature={feature} />
          </div>
        ))}

      {/* Solution Sections */}
      {data.solutions.map((solution, i) => (
        <div key={i}>
          <div className="flex items-center justify-center">
              <WavePath className="text-white/30" />
            </div>

          <SolutionSection solution={solution} bgColor={project.bgColor} />
        </div>
      ))}

      {/* Results */}
      <div className="flex items-center justify-center">
              <WavePath className="text-white/30" />
            </div>

      <section className="px-6 py-24 md:py-32">
        <motion.div
          ref={resultsRef}
          className="mx-auto max-w-7xl"
          variants={stagger}
          initial="hidden"
          animate={resultsInView ? "visible" : "hidden"}
        >
          <div className={cn("grid grid-cols-1 gap-8", data.resultsImageUrl && "lg:grid-cols-2 lg:gap-16")}>
            {/* Left: results text */}
            <div>
              <motion.h2
                className={cn(
                  "text-3xl tracking-heading text-foreground",
                  "md:text-4xl"
                )}
                variants={fadeUp}
              >
                Results
              </motion.h2>
              <motion.p
                className="mt-6 text-lg tracking-body text-muted-foreground md:text-xl"
                variants={fadeUp}
              >
                {data.results.description}
              </motion.p>
              {data.results.documentationUrl && (
                <motion.div className="mt-8" variants={fadeUp}>
                  <a
                    href={data.results.documentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-muted-foreground"
                  >
                    View Full Documentation
                    <ArrowUpRight size={14} />
                  </a>
                </motion.div>
              )}
            </div>

            {/* Right: image */}
            {data.resultsImageUrl && (
              <ProjectImage
                src={data.resultsImageUrl}
                alt={`${project.name} — results`}
              />
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}
