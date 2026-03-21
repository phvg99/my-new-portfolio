import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
