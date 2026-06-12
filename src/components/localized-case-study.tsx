"use client";

import type { Locale } from "@/lib/i18n/config";
import type { CaseStudyData } from "@/lib/projects";
import { useLanguage } from "@/components/providers/language-provider";
import { CaseStudyContent } from "@/components/case-study-content";

/**
 * Picks the active locale's case study from the prebuilt set and renders it.
 * Both locales are emitted into the static payload at build time, so the
 * switch is instant client-side with no refetch.
 */
export function LocalizedCaseStudy({
  data,
}: {
  data: Record<Locale, CaseStudyData>;
}) {
  const { locale } = useLanguage();
  return <CaseStudyContent data={data[locale]} />;
}
