"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
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

/* ------------------------------------------------------------------ */
/*  useHasMounted / useReveal                                          */
/*  Progressive-enhancement guard: content is rendered visible until   */
/*  the client confirms it is alive, so a disabled/failed/slow JS       */
/*  bundle (or a crawler) never leaves a section stuck at opacity:0.    */
/* ------------------------------------------------------------------ */

const emptySubscribe = () => () => {};

export function useHasMounted(): boolean {
  // SSR-safe mount flag: false on the server / during hydration, true once the
  // client is live — without setting state in an effect.
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Spreadable `initial`/`animate` props for a reveal-on-scroll element that
 * degrades gracefully. Before the component mounts on the client — i.e. during
 * SSR, for no-JS clients/crawlers, or when the JS bundle fails to execute — the
 * element renders in its `visible` resting state so content is never hidden.
 * Once mounted, the hidden→visible entrance is armed and driven by viewport
 * visibility, exactly as before.
 */
export function useReveal(
  ref: React.RefObject<Element | null>,
  options: { margin?: UseInViewOptions["margin"]; once?: boolean } = {}
): { initial: "hidden" | "visible"; animate: "hidden" | "visible" } {
  const mounted = useHasMounted();
  const inView = useReliableInView(ref, options);
  if (!mounted) return { initial: "visible", animate: "visible" };
  return { initial: "hidden", animate: inView ? "visible" : "hidden" };
}
