import { Navigation } from "@/components/navigation";
import { SelectedProjects } from "@/components/selected-projects";
import { Footer } from "@/components/footer";
import { SubpageLayout } from "@/components/subpage-layout";

export default function WorkPage() {
  return (
    <SubpageLayout>
      <Navigation />
      <main className="pt-24">
        <SelectedProjects />
      </main>
      <Footer />
    </SubpageLayout>
  );
}
