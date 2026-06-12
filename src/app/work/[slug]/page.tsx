import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { LocalizedCaseStudy } from "@/components/localized-case-study";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { PROJECT_SLUGS, getCaseStudyBySlug } from "@/lib/projects";
import { SubpageLayout } from "@/components/subpage-layout";

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Metadata is generated at build time and can't read the client locale,
  // so it stays in the default locale (English). The visible page still
  // switches language client-side via LocalizedCaseStudy.
  const caseStudy = getCaseStudyBySlug(slug, DEFAULT_LOCALE);

  if (!caseStudy) {
    return { title: "Not Found" };
  }

  return {
    title: `${caseStudy.project.name} — Case Study`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Build both locales at static-export time; the client wrapper selects one.
  const en = getCaseStudyBySlug(slug, "en");
  const pt = getCaseStudyBySlug(slug, "pt");

  if (!en || !pt) {
    notFound();
  }

  return (
    <SubpageLayout>
      <Navigation />
      <main className="pt-24">
        <LocalizedCaseStudy data={{ en, pt }} />
      </main>
      <Footer />
    </SubpageLayout>
  );
}
