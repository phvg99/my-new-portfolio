# Performance Optimization — Design Spec

## Context

The portfolio site exhibits noticeable lag across all pages on modern desktop hardware. Root cause analysis identified continuous 60fps animation loops, unthrottled mouse/resize event listeners, and missing build-level optimizations as the primary bottlenecks. No design elements or features will be removed — all fixes preserve existing visual behavior.

---

## Optimization Targets

### 1. Critical: Continuous Animation Loops

#### 1a. TextCursorProximity — frame-skip throttle

**File:** `src/components/21st/text-cursor-proximity.tsx`

**Problem:** `useAnimationFrame` (line 80) calls `getBoundingClientRect()` on every letter (~10 chars) on every frame (60fps) = ~600 DOM layout reads/second.

**Fix:**
- Add a frame counter that only executes the proximity calculation every 2nd frame (effectively 30fps — visually indistinguishable for this effect)
- Cache `containerRef.current.getBoundingClientRect()` and only refresh it every ~10 frames instead of every frame
- Cache per-letter `letterRef.getBoundingClientRect()` results in a ref array, refreshing on the same cadence as the container rect (~10 frames or on resize) — these per-letter reads are equally expensive layout reads

**Note:** The `label` prop must remain stable across renders — the `useMotionValue` calls inside `useRef` initializer (lines 50-55) and the `useTransform` calls in the render loop (lines 122-130) depend on a fixed array length.

**Code pattern:**
```tsx
const frameCount = useRef(0);

useAnimationFrame(() => {
  if (shouldReduceMotion) return;
  frameCount.current++;
  if (frameCount.current % 2 !== 0) return; // Skip odd frames

  // ... existing logic
});
```

#### 1b. AnimatedGridPattern — reduce rects + batch updates

**File:** `src/components/ui/animated-grid-pattern.tsx`

**Problem:** 50 `motion.rect` elements each with `delay: index * 0.1` (last one starts at 5s). Each `onAnimationComplete` fires `setSquares()` individually, causing 50 separate state updates → 50 re-renders of all rects.

**Fix:**
- Reduce default `numSquares` from 50 → 20 (60% fewer DOM nodes, visually similar density)
- Batch `onAnimationComplete` updates: collect completed IDs in a ref, flush them in a single `setSquares` call via `requestAnimationFrame`

**Code pattern:**
```tsx
const pendingUpdates = useRef<number[]>([]);
const flushRef = useRef<number | null>(null);

const scheduleUpdate = useCallback((squareId: number) => {
  pendingUpdates.current.push(squareId);
  if (!flushRef.current) {
    flushRef.current = requestAnimationFrame(() => {
      const ids = [...pendingUpdates.current];
      pendingUpdates.current = [];
      flushRef.current = null;
      const dims = dimensionsRef.current;
      setSquares(prev => prev.map(sq =>
        ids.includes(sq.id)
          ? { ...sq, pos: getRandomPos(dims.width, dims.height, width, height) }
          : sq
      ));
    });
  }
}, [width, height]);
```

**Cleanup:** Add a `useEffect` cleanup that calls `cancelAnimationFrame(flushRef.current)` on unmount to prevent state updates on unmounted components.

#### 1c. useMousePositionRef — cache container rect

**File:** `src/hooks/use-mouse-position-ref.ts`

**Problem:** `containerRef.current.getBoundingClientRect()` called on every mousemove (~60/sec). The container doesn't move between scroll/resize events.

**Fix:**
- Cache the rect in a ref
- Refresh cached rect on `scroll` and `resize` events (debounced), not on every mousemove
- Use cached rect for coordinate calculations

---

### 2. High Priority: Unthrottled Event Handlers

#### 2a. Tilt — cache rect on mouseenter

**File:** `src/components/ui/tilt.tsx`

**Problem:** `getBoundingClientRect()` called on line 59 for every mousemove event.

**Fix:**
- Cache `rect` on `mouseenter` in a ref
- Use cached rect in `mousemove` handler
- Clear on `mouseleave`

**Code pattern:**
```tsx
const cachedRect = useRef<DOMRect | null>(null);

const handleMouseEnter = () => {
  if (ref.current) cachedRect.current = ref.current.getBoundingClientRect();
};

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = cachedRect.current;
  if (!rect) return;
  // ... use rect directly
};

const handleMouseLeave = () => {
  cachedRect.current = null;
  x.set(0);
  y.set(0);
};
```

**JSX change:** Add `onMouseEnter={handleMouseEnter}` to the `motion.div` element alongside the existing `onMouseMove` and `onMouseLeave` handlers.

#### 2b. UnderlineAnimation — shared hook for resize listener

**File:** `src/components/ui/underline-animation.tsx`

**Problem:** Three identical `useEffect` blocks (lines 32-53, 103-124, 194-215) each register separate `window.addEventListener("resize", ...)` — 3x the listeners needed.

**Fix:**
- Extract a `useUnderlineSize(textRef, heightRatio, paddingRatio)` custom hook
- All three underline variants (`CenterUnderline`, `ComesInGoesOutUnderline`, `GoesOutComesInUnderline`) call this single hook
- Add a 150ms debounce to the resize handler

**Code pattern:**
```tsx
function useUnderlineSize(
  textRef: React.RefObject<HTMLSpanElement | null>,
  heightRatio: number,
  paddingRatio: number
) {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const update = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize);
        textRef.current.style.setProperty("--underline-height", `${fontSize * heightRatio}px`);
        textRef.current.style.setProperty("--underline-padding", `${fontSize * paddingRatio}px`);
      }
    };
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, 150);
    };
    update();
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [textRef, heightRatio, paddingRatio]);
}
```

---

### 3. Medium Priority

#### 3a. StaggerTestimonials — debounce resize

**File:** `src/components/ui/stagger-testimonials.tsx`

**Problem:** `window.addEventListener("resize", updateSize)` on line 133 fires continuously during resize.

**Fix:** Debounce the resize handler with 150ms timeout.

#### 3b. Footer LocalTime — memoize DateTimeFormat

**File:** `src/components/footer.tsx`

**Problem:** `new Intl.DateTimeFormat(...)` created every second inside `setInterval` (line 17).

**Fix:** Create the formatter once outside the interval callback using a ref or module-level constant.

**Code pattern:**
```tsx
const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
  timeZoneName: "short",
});

function LocalTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}
```

---

### 4. Build & Configuration

#### 4a. next.config.ts

**File:** `next.config.ts`

Add performance-relevant settings:
```ts
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};
```

#### 4b. ~~Remove unused dependency~~ — KEEP

`@base-ui/react` is actively used by `src/components/ui/button.tsx` (imports `Button as ButtonPrimitive` from `@base-ui/react/button`). Do not remove.

#### 4c. CSS variable cleanup

**File:** `src/app/globals.css`

Remove unused CSS variables with explicit safe/keep lists:

**Safe to remove:**
- `--chart-1` through `--chart-5` (and their `@theme` mappings) — not referenced in any component
- `--sidebar-*` variables (background, foreground, primary, accent, border, ring) — not referenced in any component

**Must keep:**
- `--color-1` through `--color-5` — actively used by `src/components/ui/rainbow-button.tsx` for the rainbow gradient
- `@keyframes rainbow` — used by rainbow button animation
- All other color/layout variables

---

### 5. GPU Compositing Hints

Add `will-change: transform` to continuously-transformed elements:

- **Tilt cards** — already use `transform` on every mousemove; `will-change` promotes to GPU layer
- **StaggerTestimonials cards** — use `transform` for positioning; promote for smoother transitions. Add `willChange: "transform"` to the inline `style` object (line 68 of stagger-testimonials.tsx), not as a Tailwind class, since the transform is already managed via inline styles.

For Tilt, add via Tailwind `[will-change:transform]` class or inline style.

**Note:** Do NOT add `will-change` to AnimatedGridPattern rects — SVG elements handle compositing differently and excessive GPU layers on 20+ SVG rects would be counterproductive.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/21st/text-cursor-proximity.tsx` | Frame-skip throttle in useAnimationFrame |
| `src/components/ui/animated-grid-pattern.tsx` | Reduce numSquares default, batch onAnimationComplete |
| `src/hooks/use-mouse-position-ref.ts` | Cache container rect, refresh on scroll/resize |
| `src/components/ui/tilt.tsx` | Cache rect on mouseenter |
| `src/components/ui/underline-animation.tsx` | Extract useUnderlineSize hook, debounce resize |
| `src/components/ui/stagger-testimonials.tsx` | Debounce resize handler |
| `src/components/footer.tsx` | Memoize DateTimeFormat |
| `next.config.ts` | Add reactStrictMode, poweredByHeader |
| `src/app/globals.css` | Remove unused chart/sidebar CSS variables |

## Verification

1. `npm run build` — must complete without errors
2. `npm run lint && npx tsc --noEmit` — zero warnings/errors
3. Manual browser test: navigate all pages, verify all animations still work
4. Chrome DevTools Performance tab: record 5s on homepage — confirm main thread idle time increased, no long tasks >50ms from animation loops
5. Verify TextCursorProximity hover effect still responds smoothly at 30fps
6. Verify AnimatedGridPattern visual density looks good at 20 rects
