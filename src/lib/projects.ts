import type { Locale } from "@/lib/i18n/config";
import {
  projectsContent,
  type CaseStudyText,
} from "@/lib/i18n/projects-content";

export interface Project {
  id: string;
  name: string;
  year: string;
  tags: string[];
  bgColor: string;
  mockupColor: string;
  thumbnailUrl: string;
}

export interface SubFeature {
  title: string;
  description: string;
}

export interface FeatureModule {
  moduleNumber: number;
  title: string;
  subtitle: string;
  problem: string;
  subFeatures: SubFeature[];
  imageUrl: string;
  result: {
    metric: string;
    description: string;
  };
}

export interface CaseStudyData {
  project: Project;
  description: string;
  role: string;
  client: string;
  website?: string;
  mainProblemImageUrl?: string;
  resultsImageUrl?: string;
  mainProblem: {
    description: string;
    miniProblems: Array<{ title: string; description: string }>;
  };
  solutions: Array<{
    title: string;
    description: string;
    imageUrl?: string;
    imageUrls?: string[];
  }>;
  results: { description: string; documentationUrl?: string };
  features?: FeatureModule[];
}

/* ------------------------------------------------------------------ *
 * Structural base — non-translatable data only (ids, colors, image   *
 * paths, links). Translatable text lives in i18n/projects-content.ts *
 * and is merged in by the locale-aware getters below.                *
 * ------------------------------------------------------------------ */

type ProjectBase = Omit<Project, "name" | "tags">;

interface CaseStudyBase {
  website?: string;
  mainProblemImageUrl?: string;
  resultsImageUrl?: string;
  documentationUrl?: string;
  /** Image data per solution, aligned by index with the localized text. */
  solutionImages: Array<{ imageUrl?: string; imageUrls?: string[] }>;
  /** Image path per feature module, aligned by index with the localized text. */
  featureImages?: string[];
}

const PROJECTS_BASE: ProjectBase[] = [
  {
    id: "bluz",
    year: "2024",
    bgColor: "oklch(0.25 0.02 80)",
    mockupColor: "oklch(0.32 0.03 80)",
    thumbnailUrl: "/projects/bluz/thumb.png",
  },
  {
    id: "juntos",
    year: "2024",
    bgColor: "oklch(0.25 0.03 350)",
    mockupColor: "oklch(0.32 0.04 350)",
    thumbnailUrl: "/projects/juntos/thumb.png",
  },
  {
    id: "innoscience",
    year: "2024",
    bgColor: "oklch(0.22 0.04 200)",
    mockupColor: "oklch(0.29 0.05 200)",
    thumbnailUrl: "/projects/innoscience/thumb.png",
  },
];

const CASE_STUDIES_BASE: Record<string, CaseStudyBase> = {
  bluz: {
    website: "https://baptistaluz.com.br/",
    mainProblemImageUrl: "/projects/bluz/main-problem.png",
    resultsImageUrl: "/projects/bluz/results.png",
    documentationUrl:
      "https://pedrohgarcia.notion.site/b-luz-Design-System-EN-fe578d4dec90490088eb44c8f6c5104d",
    solutionImages: [
      { imageUrl: "/projects/bluz/atomic-design.png" },
      { imageUrl: "/projects/bluz/comprehensive-design.png" },
      { imageUrl: "/projects/bluz/illustration-system.png" },
    ],
  },
  juntos: {
    mainProblemImageUrl: "/projects/juntos/main-problem.png",
    resultsImageUrl: "/projects/juntos/results.png",
    documentationUrl:
      "https://pedrohgarcia.notion.site/Juntos-Remote-Learning-Platform-for-Children-EN-b64287f7497e47558eb9f7544d5761fb",
    solutionImages: [
      { imageUrl: "/projects/juntos/immersive-virtual.png" },
      { imageUrl: "/projects/juntos/child-first-visual.png" },
      {
        imageUrls: [
          "/projects/juntos/multi-stakeholder-1.png",
          "/projects/juntos/multi-stakeholder-2.png",
          "/projects/juntos/multi-stakeholder-3.png",
        ],
      },
    ],
  },
  innoscience: {
    website: "https://innoscience.com.br/",
    documentationUrl:
      "https://pedrohgarcia.notion.site/Innoscience-Task-Manager-Framework-and-navegation-EN-245072a1953480309462e7e1443aa775",
    solutionImages: [],
    featureImages: [
      "/projects/innoscience/task-manager.png",
      "/projects/innoscience/framework-module.png",
      "/projects/innoscience/navegation-menu.png",
    ],
  },
};

/* ------------------------------------------------------------------ *
 * Locale-aware getters — merge structural base with localized text.  *
 * ------------------------------------------------------------------ */

/** Stable project ids in display order — for generateStaticParams. */
export const PROJECT_SLUGS = PROJECTS_BASE.map((p) => p.id);

export function getProjects(locale: Locale): Project[] {
  const text = projectsContent[locale].projects;
  return PROJECTS_BASE.map((base) => ({
    ...base,
    name: text[base.id]?.name ?? base.id,
    tags: text[base.id]?.tags ?? [],
  }));
}

export function getProjectBySlug(
  slug: string,
  locale: Locale,
): Project | undefined {
  const base = PROJECTS_BASE.find((p) => p.id === slug);
  const text = projectsContent[locale].projects[slug];
  if (!base || !text) return undefined;
  return { ...base, name: text.name, tags: text.tags };
}

function mergeCaseStudy(
  project: Project,
  base: CaseStudyBase,
  text: CaseStudyText,
): CaseStudyData {
  return {
    project,
    description: text.description,
    role: text.role,
    client: text.client,
    website: base.website,
    mainProblemImageUrl: base.mainProblemImageUrl,
    resultsImageUrl: base.resultsImageUrl,
    mainProblem: text.mainProblem,
    solutions: text.solutions.map((solution, i) => ({
      ...solution,
      imageUrl: base.solutionImages[i]?.imageUrl,
      imageUrls: base.solutionImages[i]?.imageUrls,
    })),
    results: {
      description: text.results.description,
      documentationUrl: base.documentationUrl,
    },
    features: text.features?.map((feature, i) => ({
      moduleNumber: i + 1,
      title: feature.title,
      subtitle: feature.subtitle,
      problem: feature.problem,
      subFeatures: feature.subFeatures,
      imageUrl: base.featureImages?.[i] ?? "",
      result: feature.result,
    })),
  };
}

export function getCaseStudyBySlug(
  slug: string,
  locale: Locale,
): CaseStudyData | undefined {
  const project = getProjectBySlug(slug, locale);
  const base = CASE_STUDIES_BASE[slug];
  const text = projectsContent[locale].caseStudies[slug];
  if (!project || !base || !text) return undefined;
  return mergeCaseStudy(project, base, text);
}
