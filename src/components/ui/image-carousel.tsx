"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { assetPath, cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspect?: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export function ImageCarousel({
  images,
  alt,
  aspect = "aspect-video",
}: ImageCarouselProps) {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const navigate = useCallback(
    (newDirection: number) => {
      setCurrent(([prev]) => {
        const next =
          (prev + newDirection + images.length) % images.length;
        return [next, newDirection];
      });
    },
    [images.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate(1);
      }
    },
    [navigate]
  );

  return (
    <div>
      <div
        className={cn(
          aspect,
          "relative w-full overflow-hidden border border-border"
        )}
        role="region"
        aria-roledescription="carousel"
        aria-label={alt}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={assetPath(images[current])}
              alt={`${alt} — ${current + 1} of ${images.length}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={cn(
            "absolute left-3 top-1/2 z-10 -translate-y-1/2",
            "flex h-10 w-10 items-center justify-center font-mono text-lg text-blue",
            "bg-white transition-colors hover:bg-yellow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Previous image"
        >
          ←
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => navigate(1)}
          className={cn(
            "absolute right-3 top-1/2 z-10 -translate-y-1/2",
            "flex h-10 w-10 items-center justify-center font-mono text-lg text-blue",
            "bg-white transition-colors hover:bg-yellow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Next image"
        >
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent([i, i > current ? 1 : -1])}
            className={cn(
              "h-2 w-2 transition-colors",
              i === current ? "bg-yellow" : "bg-white/32"
            )}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
