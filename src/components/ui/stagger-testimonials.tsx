"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/components/providers/language-provider';

interface Testimonial {
  testimonial: string;
  by: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  onClick: () => void;
  cardSize: number;
  spacing: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  onClick,
  cardSize,
  spacing
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute left-1/2 top-1/2 flex flex-col cursor-pointer border p-8 transition-[transform,background-color,border-color] duration-300",
        isCenter
          ? "z-10 border-yellow bg-yellow text-blue"
          : "z-0 border-border bg-card text-white hover:border-yellow"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        willChange: "transform",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transform: `translate(-50%, -50%) translateX(${spacing * position}px)`,
      }}
    >
      <h3 className={cn(
        "flex-1 overflow-hidden font-mono text-sm sm:text-base lg:text-lg leading-snug",
        isCenter ? "text-blue" : "text-white"
      )}>
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p className={cn(
        "mt-auto pt-2 font-display text-base",
        isCenter ? "text-blue/80" : "text-white/56"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const t = useTranslation();
  const testimonials = t.testimonials.items;

  const [cardSize, setCardSize] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(1280);
  const [activeIndex, setActiveIndex] = useState(0);

  const n = testimonials.length;
  const half = Math.floor(n / 2);

  const handleMove = (steps: number) => {
    setActiveIndex(prev => prev + steps);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateSize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      if (width >= 1440) {
        setCardSize(400);
      } else if (width >= 640) {
        setCardSize(365);
      } else {
        setCardSize(290);
      }
    };
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 150);
    };

    updateSize();
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, []);

  if (cardSize === null) {
    return <div className="relative w-full" style={{ height: 600 }} />;
  }

  const baseSpacing = cardSize / 1.5;
  const scaleFactor = Math.max(1, Math.min(viewportWidth / 1280, 1.5));
  const spacing = baseSpacing * scaleFactor;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 600 }}
    >
      {testimonials.map((testimonial, i) => {
        const relativeIndex = ((i - activeIndex) % n + n) % n;
        const position = relativeIndex - half;
        return (
          <TestimonialCard
            key={i}
            testimonial={testimonial}
            onClick={() => handleMove(position)}
            position={position}
            cardSize={cardSize}
            spacing={spacing}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center font-mono text-2xl text-white transition-colors",
            "border border-border bg-transparent hover:bg-yellow hover:text-blue",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label={t.testimonials.prevAria}
        >
          ←
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center font-mono text-2xl text-white transition-colors",
            "border border-border bg-transparent hover:bg-yellow hover:text-blue",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label={t.testimonials.nextAria}
        >
          →
        </button>
      </div>
    </div>
  );
};
