"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, type UseInViewOptions } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Shared animation variants                                          */
/* ------------------------------------------------------------------ */

/* Sharp, snappy entrance — Stephanie `--ease-out`, never bouncy. */
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      ease: [0.22, 1, 0.36, 1] as const,
      duration: 0.4,
    },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ------------------------------------------------------------------ */
/*  useReliableInView                                                  */
/*  Wraps Framer Motion's useInView with a mount-time visibility       */
/*  check so elements already in the viewport on client-side           */
/*  navigation always become visible.                                  */
/* ------------------------------------------------------------------ */

export function useReliableInView(
  ref: React.RefObject<Element | null>,
  options: { margin?: UseInViewOptions["margin"]; once?: boolean } = {}
): boolean {
  const { margin, once = true } = options;
  const framerInView = useInView(ref, { margin, once });
  const [mountVisible, setMountVisible] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    if (seen.current) return;
    requestAnimationFrame(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setMountVisible(true);
          if (once) seen.current = true;
        }
      }
    });
  }, [ref, once]);

  return framerInView || mountVisible;
}
