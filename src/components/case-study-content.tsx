"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { assetPath, cn } from "@/lib/utils";
import { fadeUp, stagger, useHasMounted, useReveal } from "@/lib/motion";
import type { CaseStudyData, FeatureModule } from "@/lib/projects";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { useTranslation } from "@/components/providers/language-provider";

/** Hairline section divider — replaces the old interactive wave. */
function Divider() {
  return (
    <div className="mx-auto max-w-[var(--max-width-container)] px-6">
      <hr className="border-0 border-t border-border" />
    </div>
  );
}

/** Mono uppercase eyebrow label in yellow. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="font-mono text-xs uppercase tracking-loose text-yellow"
      variants={fadeUp}
    >
      {children}
    </motion.p>
  );
}

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
        className={cn(aspect, "w-full")}
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
          "relative w-full overflow-hidden border border-border"
        )}
      >
        <Image
          src={assetPath(src)}
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

function FeatureModuleSection({
  feature,
}: {
  feature: FeatureModule;
}) {
  const t = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, { margin: "-80px" });

  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div
        ref={ref}
        className="mx-auto max-w-[var(--max-width-container)]"
        variants={stagger}
        {...reveal}
      >
        {/* Module header */}
        <motion.p
          className="font-mono text-xs uppercase tracking-loose text-yellow"
          variants={fadeUp}
        >
          {t.caseStudy.module} {String(feature.moduleNumber).padStart(2, "0")}
        </motion.p>
        <motion.h2
          className="mt-3 font-display text-4xl text-white md:text-5xl lg:text-6xl"
          variants={fadeUp}
        >
          {feature.title}
        </motion.h2>
        <motion.p
          className="mt-3 font-mono text-lg text-white/72"
          variants={fadeUp}
        >
          {feature.subtitle}
        </motion.p>

        {/* Problem context */}
        <motion.p
          className="mt-8 max-w-3xl font-mono text-white/72 tracking-body"
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
              className="border border-border bg-card p-6"
              variants={fadeUp}
            >
              <h4 className="font-display text-xl text-white">
                {sf.title}
              </h4>
              <p className="mt-2 font-mono text-sm text-white/72 tracking-body">
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
          className="mt-12 border-l-2 border-yellow bg-card p-8"
          variants={fadeUp}
        >
          <p className="font-display text-3xl text-yellow md:text-4xl">
            {feature.result.metric}
          </p>
          <p className="mt-3 font-mono text-white/72 tracking-body">
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
  const reveal = useReveal(ref, { margin: "-80px" });

  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div
        ref={ref}
        className="mx-auto max-w-[var(--max-width-container)]"
        variants={stagger}
        {...reveal}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: solution text */}
          <div>
            <motion.h2
              className="font-display text-4xl text-white md:text-5xl"
              variants={fadeUp}
            >
              {solution.title}
            </motion.h2>
            <motion.p
              className="mt-6 font-mono text-lg tracking-body text-white/72"
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
  const t = useTranslation();
  const { project } = data;

  const mounted = useHasMounted();

  const headerRef = useRef<HTMLDivElement>(null);
  const headerReveal = useReveal(headerRef, { margin: "-80px" });

  const problemRef = useRef<HTMLDivElement>(null);
  const problemReveal = useReveal(problemRef, { margin: "-80px" });

  const resultsRef = useRef<HTMLDivElement>(null);
  const resultsReveal = useReveal(resultsRef, { margin: "-80px" });

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-6 pt-28">
        <nav className="mx-auto max-w-[var(--max-width-container)]" aria-label="Breadcrumb">
          <motion.p
            variants={fadeUp}
            initial={mounted ? "hidden" : "visible"}
            animate="visible"
            className="font-mono text-xs uppercase tracking-loose text-white/56"
          >
            <Link
              href="/#work"
              className="transition-colors hover:text-yellow"
            >
              {t.caseStudy.breadcrumbWork}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{project.name}</span>
          </motion.p>
        </nav>
      </div>

      {/* Project Header */}
      <section className="px-6 py-24 md:py-32">
        <motion.div
          ref={headerRef}
          className="mx-auto max-w-[var(--max-width-container)]"
          variants={stagger}
          {...headerReveal}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left: text */}
            <div>
              <motion.h1
                className="font-display text-5xl text-white md:text-7xl lg:text-[88px]"
                variants={fadeUp}
              >
                {project.name}
              </motion.h1>

              <motion.p
                className="mt-6 font-mono text-lg tracking-body text-white/72"
                variants={fadeUp}
              >
                {data.description}
              </motion.p>

              {/* Metadata */}
              <motion.dl className="mt-8 space-y-4" variants={fadeUp}>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-loose text-yellow">
                    {t.caseStudy.role}
                  </dt>
                  <dd className="mt-1 font-mono text-white">{data.role}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-loose text-yellow">
                    {t.caseStudy.client}
                  </dt>
                  <dd className="mt-1 font-mono text-white">{data.client}</dd>
                </div>
                {data.website && (
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-loose text-yellow">
                      {t.caseStudy.websiteLink}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-white transition-colors hover:text-yellow"
                      >
                        {data.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        <span aria-hidden>→</span>
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
          className="mx-auto max-w-[var(--max-width-container)]"
          variants={stagger}
          {...problemReveal}
        >
          <div className={cn("grid grid-cols-1 gap-8", data.mainProblemImageUrl && "lg:grid-cols-2 lg:gap-16")}>
            {/* Left: problem details */}
            <div>
              <SectionLabel>{t.caseStudy.mainProblem}</SectionLabel>
              <motion.p
                className="mt-4 font-mono text-lg tracking-body text-white/72"
                variants={fadeUp}
              >
                {data.mainProblem.description}
              </motion.p>

              {/* Mini problems */}
              <div className="mt-10 space-y-8">
                {data.mainProblem.miniProblems.map((mini, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <h3 className="font-display text-xl text-white">
                      {mini.title}
                    </h3>
                    <p className="mt-2 font-mono text-white/72 tracking-body">
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
            <Divider />
            <FeatureModuleSection feature={feature} />
          </div>
        ))}

      {/* Solution Sections */}
      {data.solutions.map((solution, i) => (
        <div key={i}>
          <Divider />
          <SolutionSection solution={solution} bgColor={project.bgColor} />
        </div>
      ))}

      {/* Results */}
      <Divider />

      <section className="px-6 py-24 md:py-32">
        <motion.div
          ref={resultsRef}
          className="mx-auto max-w-[var(--max-width-container)]"
          variants={stagger}
          {...resultsReveal}
        >
          <div className={cn("grid grid-cols-1 gap-8", data.resultsImageUrl && "lg:grid-cols-2 lg:gap-16")}>
            {/* Left: results text */}
            <div>
              <motion.h2
                className="font-display text-4xl text-white md:text-5xl"
                variants={fadeUp}
              >
                {t.caseStudy.results}
              </motion.h2>
              <motion.p
                className="mt-6 font-mono text-lg tracking-body text-white/72"
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
                    className="inline-flex items-center gap-1.5 font-mono text-white transition-colors hover:text-yellow"
                  >
                    {t.caseStudy.viewDocumentation}
                    <span aria-hidden>→</span>
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
