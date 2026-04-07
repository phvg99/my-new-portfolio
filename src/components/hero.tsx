"use client";

import { useRef } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import TextCursorProximity from "@/components/21st/text-cursor-proximity";
import { cn } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black">
      <AnimatedGridPattern
        numSquares={15}
        maxOpacity={0.3}
        duration={3}
        repeatDelay={1}
        className={cn(
          "z-10 fill-white/15 stroke-white/30",
          "[-webkit-mask-image:radial-gradient(ellipse_100%_100%_at_center,white_60%,transparent)]",
          "[mask-image:radial-gradient(ellipse_100%_100%_at_center,white_60%,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 z-10 pointer-events-none",
          "flex flex-col items-center justify-center gap-4 px-6 text-center"
        )}
      >
        <h1>
          <TextCursorProximity
            label="Hello World"
            styles={{
              transform: { from: "scale(1)", to: "scale(1.3)" },
              color: { from: "#FFFFFF", to: "#A0A0A0" },
            }}
            falloff="gaussian"
            radius={120}
            containerRef={sectionRef}
            className={cn(
              "pointer-events-none text-4xl font-semibold tracking-display text-white",
              "md:text-6xl lg:text-7xl"
            )}
          />
        </h1>
        <p
          className={cn(
            "pointer-events-none max-w-2xl text-lg tracking-heading text-white/70",
            "md:text-xl lg:text-2xl"
          )}
        >
          Product Designer transforming complex problems into
          high-performance products.
        </p>
        <div className="mt-8 flex gap-4 pointer-events-auto">
          <Link href="/work">
            <InteractiveHoverButton
              text="Work"
              className="border-white/30 bg-transparent text-white"
            />
          </Link>
          <Link href="/about">
            <InteractiveHoverButton
              text="About"
              className="border-white/30 bg-transparent text-white"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
