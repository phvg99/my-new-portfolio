import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CaseStudyContent } from "@/components/case-study-content";
import { PROJECTS, getCaseStudyBySlug } from "@/lib/projects";
import { SubpageLayout } from "@/components/subpage-layout";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

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
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <SubpageLayout>
      <Navigation />
      <main className="pt-24">
        <CaseStudyContent data={caseStudy} />
      </main>
      <Footer />
    </SubpageLayout>
  );
}
