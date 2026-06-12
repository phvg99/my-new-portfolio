import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { SelectedProjects } from "@/components/selected-projects";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SelectedProjects />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
