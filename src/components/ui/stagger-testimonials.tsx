"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    testimonial: "A quick grasp of project complexities and the ability to translate them into creative solutions — that's what he brings, along with a culture of collaboration and knowledge-sharing.",
    by: "Douglas Junior, Head of Design",
    imgSrc: "/testimonials/douglas-junior.jpg",
  },
  {
    testimonial: "A keen eye for detail and a focus on real user experience. Collaborative, reliable, and delivers with quality.",
    by: "Alex Minoru Abe, Product Designer & Developer",
    imgSrc: "/testimonials/alex-minoru-abe.jpg",
  },
  {
    testimonial: "Fresh perspectives, complex flows built from scratch, and always receptive to feedback. You'll want him on the team.",
    by: "Richard de Souza, Developer",
    imgSrc: "/testimonials/richard-de-souza.jpg",
  },
  {
    testimonial: "Curiosity drives his problem-solving, clarity guides his design, and the user's real context is always top of mind. Collaborative and solution-oriented.",
    by: "Marcelo Antonietto, Lead Product Designer",
    imgSrc: "/testimonials/marcelo-antonietto.jpg",
  },
  {
    testimonial: "Contagious energy and good vibes — always dedicated, always delivering excellent work. A great designer to have as a teammate.",
    by: "José Marcolino, UX Researcher",
    imgSrc: "/testimonials/jose-marcolino.jpg",
  },
  {
    testimonial: "He structured our complete design system — colors, typography, components — all well documented. Made it simple for devs to build.",
    by: "Renan Rocha, Developer",
    imgSrc: "/testimonials/renan-rocha.jpg",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  onClick: () => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  onClick,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        willChange: "transform",
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <Image
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        width={48}
        height={56}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [activeIndex, setActiveIndex] = useState(0);

  const n = testimonials.length;
  const half = Math.floor(n / 2);

  const handleMove = (steps: number) => {
    setActiveIndex(prev => prev + steps);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
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

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30"
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
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
