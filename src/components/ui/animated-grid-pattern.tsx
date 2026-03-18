"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number | string;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

function getRandomPos(
  containerWidth: number,
  containerHeight: number,
  cellWidth: number,
  cellHeight: number,
) {
  return [
    Math.floor((Math.random() * containerWidth) / cellWidth),
    Math.floor((Math.random() * containerHeight) / cellHeight),
  ];
}

function createSquares(
  count: number,
  containerWidth: number,
  containerHeight: number,
  cellWidth: number,
  cellHeight: number,
) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    pos: getRandomPos(containerWidth, containerHeight, cellWidth, cellHeight),
  }));
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 20,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 1,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const [squares, setSquares] = useState(() =>
    Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      pos: [0, 0],
    })),
  );

  const pendingUpdates = useRef<number[]>([]);
  const flushRef = useRef<number | null>(null);

  const scheduleUpdate = useCallback(
    (squareId: number) => {
      pendingUpdates.current.push(squareId);
      if (!flushRef.current) {
        flushRef.current = requestAnimationFrame(() => {
          const ids = [...pendingUpdates.current];
          pendingUpdates.current = [];
          flushRef.current = null;
          const dims = dimensionsRef.current;
          setSquares((prev) =>
            prev.map((sq) =>
              ids.includes(sq.id)
                ? {
                    ...sq,
                    pos: getRandomPos(dims.width, dims.height, width, height),
                  }
                : sq,
            ),
          );
        });
      }
    },
    [width, height],
  );

  useEffect(() => {
    const currentRef = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newDims = {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        };
        dimensionsRef.current = newDims;
        if (newDims.width && newDims.height) {
          setSquares(
            createSquares(numSquares, newDims.width, newDims.height, width, height),
          );
        }
      }
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, [numSquares, width, height]);

  useEffect(() => {
    return () => {
      if (flushRef.current) {
        cancelAnimationFrame(flushRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [px, py], id: squareId }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
              repeatDelay,
            }}
            onAnimationComplete={() => scheduleUpdate(squareId)}
            key={`${px}-${py}-${index}`}
            width={width - 1}
            height={height - 1}
            x={px * width + 1}
            y={py * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
