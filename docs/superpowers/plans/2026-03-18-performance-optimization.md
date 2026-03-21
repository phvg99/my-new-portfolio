# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate noticeable lag across all pages by throttling continuous animation loops, caching layout reads, deduplicating event listeners, and cleaning up build config — without removing any design elements or features.

**Architecture:** Surgical fixes to 9 files. No new dependencies. No architectural changes. Each task is an independent component optimization that can be verified in isolation.

**Tech Stack:** Next.js 15, TypeScript, motion (Framer Motion), Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-18-performance-optimization-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/hooks/use-mouse-position-ref.ts` | Modify | Cache container rect, refresh on scroll/resize only |
| `src/components/21st/text-cursor-proximity.tsx` | Modify | Frame-skip throttle + cache letter rects |
| `src/components/ui/animated-grid-pattern.tsx` | Modify | Reduce default numSquares, batch onAnimationComplete |
| `src/components/ui/tilt.tsx` | Modify | Cache rect on mouseenter |
| `src/components/ui/underline-animation.tsx` | Modify | Extract useUnderlineSize hook, debounce resize |
| `src/components/ui/stagger-testimonials.tsx` | Modify | Debounce resize + will-change hint |
| `src/components/footer.tsx` | Modify | Memoize DateTimeFormat at module level |
| `next.config.ts` | Modify | Add reactStrictMode + poweredByHeader |
| `src/app/globals.css` | Modify | Remove unused chart/sidebar CSS vars |

---

### Task 1: useMousePositionRef — cache container rect

**Files:**
- Modify: `src/hooks/use-mouse-position-ref.ts`

- [ ] **Step 1: Implement cached rect with scroll/resize refresh**

Replace the entire file content with:

```ts
import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) => {
  const positionRef = useRef({ x: 0, y: 0 });
  const cachedRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const refreshRect = () => {
      if (containerRef?.current) {
        cachedRectRef.current = containerRef.current.getBoundingClientRect();
      }
    };

    const updatePosition = (x: number, y: number) => {
      if (containerRef && cachedRectRef.current) {
        const rect = cachedRectRef.current;
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };

    // Initial rect cache
    refreshRect();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("scroll", refreshRect, true);
    window.addEventListener("resize", refreshRect);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", refreshRect, true);
      window.removeEventListener("resize", refreshRect);
    };
  }, [containerRef]);

  return positionRef;
};
```

Key change: `getBoundingClientRect()` now runs once on mount and refreshes on scroll/resize — not on every mousemove.

- [ ] **Step 2: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-mouse-position-ref.ts
git commit -m "perf: cache container rect in useMousePositionRef, refresh on scroll/resize only"
```

---

### Task 2: TextCursorProximity — frame-skip throttle + cache letter rects

**Files:**
- Modify: `src/components/21st/text-cursor-proximity.tsx`

- [ ] **Step 1: Add frame-skip and letter rect caching**

Add these refs after the existing `letterRefs` ref (line 46):

```tsx
const frameCount = useRef(0)
const cachedLetterRects = useRef<DOMRect[]>([])
```

Replace the `useAnimationFrame` block (lines 80-102) with:

```tsx
useAnimationFrame(() => {
  if (shouldReduceMotion) return
  if (!containerRef.current) return

  frameCount.current++
  if (frameCount.current % 2 !== 0) return // 30fps — visually identical

  const containerRect = containerRef.current.getBoundingClientRect()

  // Refresh letter rects every 10 frames (3x/sec) — letters don't move between resizes
  if (frameCount.current % 10 === 0 || cachedLetterRects.current.length === 0) {
    cachedLetterRects.current = letterRefs.current.map(
      (ref) => ref?.getBoundingClientRect() ?? new DOMRect()
    )
  }

  cachedLetterRects.current.forEach((rect, index) => {
    const letterCenterX = rect.left + rect.width / 2 - containerRect.left
    const letterCenterY = rect.top + rect.height / 2 - containerRect.top

    const distance = calculateDistance(
      mousePositionRef.current.x,
      mousePositionRef.current.y,
      letterCenterX,
      letterCenterY
    )

    const proximity = calculateFalloff(distance)
    letterProximities.current[index]?.set(proximity)
  })
})
```

- [ ] **Step 2: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/21st/text-cursor-proximity.tsx
git commit -m "perf: throttle TextCursorProximity to 30fps, cache letter rects"
```

---

### Task 3: AnimatedGridPattern — reduce default numSquares + batch updates

**Files:**
- Modify: `src/components/ui/animated-grid-pattern.tsx`

- [ ] **Step 1: Reduce default numSquares and add batched updates**

Change the default parameter value on line 52 from `numSquares = 50` to `numSquares = 20`.

Replace the `updateSquarePosition` callback (lines 69-84) with the batched version:

```tsx
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
```

Add cleanup `useEffect` after the existing ResizeObserver `useEffect` block (after line 112):

```tsx
useEffect(() => {
  return () => {
    if (flushRef.current) {
      cancelAnimationFrame(flushRef.current);
    }
  };
}, []);
```

Update the `onAnimationComplete` in the JSX (line 153) from:
```tsx
onAnimationComplete={() => updateSquarePosition(squareId)}
```
to:
```tsx
onAnimationComplete={() => scheduleUpdate(squareId)}
```

Verify `useRef` is already in the imports on line 3 (it is).

- [ ] **Step 2: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/animated-grid-pattern.tsx
git commit -m "perf: reduce AnimatedGridPattern default to 20 rects, batch position updates"
```

---

### Task 4: Tilt — cache rect on mouseenter + will-change hint

**Files:**
- Modify: `src/components/ui/tilt.tsx`

- [ ] **Step 1: Add rect caching and will-change**

Add a new ref after the existing `ref` (line 31):

```tsx
const cachedRect = useRef<DOMRect | null>(null);
```

Add a `handleMouseEnter` handler after the existing motion values (after line 54):

```tsx
const handleMouseEnter = () => {
  if (ref.current) cachedRect.current = ref.current.getBoundingClientRect();
};
```

Replace the `handleMouseMove` function (lines 56-70) with:

```tsx
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = cachedRect.current;
  if (!rect) return;

  const width = rect.width;
  const height = rect.height;
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const xPos = mouseX / width - 0.5;
  const yPos = mouseY / height - 0.5;

  x.set(xPos);
  y.set(yPos);
};
```

Replace the `handleMouseLeave` function (lines 72-75) with:

```tsx
const handleMouseLeave = () => {
  cachedRect.current = null;
  x.set(0);
  y.set(0);
};
```

Update the `motion.div` JSX (lines 78-88) to add `onMouseEnter` and `will-change`:

```tsx
<motion.div
  ref={ref}
  className={className}
  style={{
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    ...style,
    transform,
  }}
  onMouseEnter={handleMouseEnter}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
  {children}
</motion.div>
```

- [ ] **Step 2: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/tilt.tsx
git commit -m "perf: cache Tilt rect on mouseenter, add will-change hint"
```

---

### Task 5: UnderlineAnimation — extract shared hook with debounced resize

**Files:**
- Modify: `src/components/ui/underline-animation.tsx`

- [ ] **Step 1: Add useUnderlineSize hook and refactor all three variants**

Add the shared hook at the top of the file, after the `DirectionalUnderlineProps` interface closing brace (after line 19):

```tsx
function useUnderlineSize(
  textRef: React.RefObject<HTMLSpanElement | null>,
  heightRatio: number,
  paddingRatio: number
) {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const update = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize)
        textRef.current.style.setProperty(
          "--underline-height",
          `${fontSize * heightRatio}px`
        )
        textRef.current.style.setProperty(
          "--underline-padding",
          `${fontSize * paddingRatio}px`
        )
      }
    }
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(update, 150)
    }
    update()
    window.addEventListener("resize", debouncedUpdate)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", debouncedUpdate)
    }
  }, [textRef, heightRatio, paddingRatio])
}
```

In `CenterUnderline` (lines 21-83): replace the entire `useEffect` block (lines 32-53) with:

```tsx
useUnderlineSize(textRef, underlineHeightRatio, underlinePaddingRatio)
```

In `ComesInGoesOutUnderline` (lines 86-174): replace the entire `useEffect` block (lines 103-124) with:

```tsx
useUnderlineSize(textRef, underlineHeightRatio, underlinePaddingRatio)
```

In `GoesOutComesInUnderline` (lines 177-268): replace the entire `useEffect` block (lines 194-215) with:

```tsx
useUnderlineSize(textRef, underlineHeightRatio, underlinePaddingRatio)
```

Keep the existing `useEffect` import — it is used by the new `useUnderlineSize` hook.

- [ ] **Step 2: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/underline-animation.tsx
git commit -m "perf: extract useUnderlineSize hook, debounce resize listener"
```

---

### Task 6: StaggerTestimonials — debounce resize + will-change hint

**Files:**
- Modify: `src/components/ui/stagger-testimonials.tsx`

- [ ] **Step 1: Debounce the resize handler**

Replace the `useEffect` block (lines 126-135) with:

```tsx
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
```

- [ ] **Step 2: Add will-change hint to card style**

In the `TestimonialCard` component, add `willChange: "transform"` to the `style` object (line 68). Update the style prop to:

```tsx
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
```

- [ ] **Step 3: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/stagger-testimonials.tsx
git commit -m "perf: debounce StaggerTestimonials resize, add will-change hint"
```

---

### Task 7: Footer — memoize DateTimeFormat

**Files:**
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Move formatter to module scope**

Add the formatter constant before the `LocalTime` function (before line 11):

```tsx
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZoneName: "short",
});
```

Replace the `LocalTime` function body (lines 11-32) with:

```tsx
function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => setTime(timeFormatter.format(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}
```

- [ ] **Step 2: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/footer.tsx
git commit -m "perf: memoize Intl.DateTimeFormat in Footer at module scope"
```

---

### Task 8: Build config + CSS cleanup

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update next.config.ts**

Replace the config object (lines 3-5) with:

```ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};
```

- [ ] **Step 2: Remove unused CSS variables from globals.css**

Remove the chart color `@theme` mappings (lines 21-25):
```css
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
```

Remove the sidebar `@theme` mappings (lines 13-20):
```css
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
```

Remove the chart `:root` variables (lines 88-92):
```css
  --chart-1: oklch(0.809 0.105 251.813);
  --chart-2: oklch(0.623 0.214 259.815);
  --chart-3: oklch(0.546 0.245 262.881);
  --chart-4: oklch(0.488 0.243 264.376);
  --chart-5: oklch(0.424 0.199 265.638);
```

Remove the sidebar `:root` variables (lines 94-101):
```css
  --sidebar: oklch(0.1 0 0);
  --sidebar-foreground: oklch(0.961 0 0);
  --sidebar-primary: oklch(0.961 0 0);
  --sidebar-primary-foreground: oklch(0.058 0 0);
  --sidebar-accent: oklch(0.15 0 0);
  --sidebar-accent-foreground: oklch(0.961 0 0);
  --sidebar-border: oklch(1 0 0 / 8%);
  --sidebar-ring: oklch(0.498 0 0);
```

**DO NOT remove:** `--color-1` through `--color-5`, `--color-color-1` through `--color-color-5`, `@keyframes rainbow`, or any other color/layout variables.

- [ ] **Step 3: Verify lint + types + build pass**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: All pass with no errors

- [ ] **Step 4: Commit**

```bash
git add next.config.ts src/app/globals.css
git commit -m "perf: add Next.js config optimizations, remove unused CSS variables"
```

---

### Task 9: Final verification

- [ ] **Step 1: Full build verification**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Full lint + type check**

Run: `npm run lint && npx tsc --noEmit`
Expected: Zero warnings/errors

- [ ] **Step 3: Dev server smoke test**

Run: `npm run dev`
Then manually verify in browser:
1. Homepage: AnimatedGridPattern animates, TextCursorProximity responds to mouse hover
2. Navigate to /work: Tilt cards respond to mouse hover
3. Navigate to /about: StaggerTestimonials carousel works
4. Footer: Time updates every second, underline hover animations work on all links
5. Resize browser window: All responsive behaviors still work

- [ ] **Step 4: Mark complete**

All optimizations applied. Expected improvements:
- ~70% reduction in layout reads per second (cached rects + frame skipping)
- ~60% fewer animated DOM nodes (20 vs 50 grid rects)
- ~67% fewer resize listeners (1 shared hook vs 3 duplicate)
- Zero unnecessary object allocations (DateTimeFormat memoized)
- GPU-accelerated transforms on Tilt and Testimonial cards
