# Testimonials Wide-Screen Fix — Design Spec

## Context

On wider screens (1440p+, ultrawide monitors), the testimonials cards in the About page appear "cut in half" at the edges. This happens because:

1. The testimonials wrapper is constrained to `max-w-[var(--max-width-container)]` (1280px)
2. Card horizontal spacing is fixed at `cardSize / 1.5` (~243px per position)
3. The container has `overflow-hidden`, clipping outermost cards
4. The `cardSize` itself is fixed at 365px for all desktop widths

The result: on screens wider than ~1280px, edge cards get clipped and the section looks cramped relative to the viewport.

## Goal

Make the testimonials section span the full viewport width on wider screens, with cards spreading proportionally so nothing is clipped.

## Design

### 1. Remove container constraint from testimonials wrapper

**File:** `src/app/about/page.tsx`

Remove `max-w-[var(--max-width-container)]` from the `<motion.div>` wrapping `<StaggerTestimonials />`. The section should be full-width, letting the inner component fill the viewport.

### 2. Scale card spacing proportionally

**File:** `src/components/ui/stagger-testimonials.tsx`

Scale the existing spacing proportionally based on viewport width, preserving the overlapping fan aesthetic. The key insight: the current `cardSize / 1.5` spacing creates intentional card overlap — we must preserve this ratio while letting cards spread on wider screens.

**Current formula:**
```
translateX: (cardSize / 1.5) * position  // ~243px per step
```

**New formula:**
```
const baseSpacing = cardSize / 1.5;
const scaleFactor = Math.max(1, Math.min(window.innerWidth / 1280, 1.5));
const spacing = baseSpacing * scaleFactor;
translateX: spacing * position
```

- `1280` anchors the scale to the current design breakpoint (below this, spacing stays at baseline)
- `scaleFactor` is clamped between `1` (no shrink) and `1.5` (prevents excessive gaps on ultrawide)
- At 1920px: `scaleFactor ≈ 1.5` → spacing ≈ 365px → cards spread ~50% wider
- At 2560px: clamped at `1.5` → same as 1920px, prevents runaway spacing

**Implementation:** Extend the existing `useEffect` resize listener to also read `window.innerWidth` and store it in state alongside `cardSize`. No ref or `ResizeObserver` needed — since the section is full-width after removing the container constraint, `window.innerWidth` equals the container width. Pass the computed `spacing` as a new prop to `TestimonialCard`.

**Props change:** Add `spacing: number` to `TestimonialCardProps`. Replace `(cardSize / 1.5) * position` with `spacing * position` in the card's inline `transform` style.

### 3. Scale card size at wider breakpoints

Add a third breakpoint for card size:
- Mobile (<640px): 290px
- Desktop (640px+): 365px
- Wide (1440px+): 400px

Threshold is 1440px (not 1280px) because that's the first viewport where clipping actually manifests. This prevents cards from looking too small relative to the available space on large monitors.

### 4. Keep overflow-hidden

The `overflow-hidden` on the inner container stays — it still clips gracefully at extreme positions. The difference is that with proportional spacing, the visible cards now fit within the viewport width.

## Files to Modify

1. **`src/app/about/page.tsx`** — Remove `max-w-[var(--max-width-container)]` from testimonials wrapper. The heading section above retains its max-width constraint (intentional — heading stays centered, card area goes full-bleed).
2. **`src/components/ui/stagger-testimonials.tsx`** — Extend existing resize effect to track `window.innerWidth`, compute proportional spacing, add `spacing` prop to `TestimonialCard`, add 1440px+ card size breakpoint

## Verification

1. Run `npm run dev` and check the testimonials section at various viewport widths:
   - 1024px (standard laptop) — cards should look similar to current
   - 1440px (common desktop) — cards should spread wider, no clipping
   - 1920px (full HD) — cards fill the space, no "cut in half" effect
   - 2560px+ (ultrawide) — cards distribute evenly, readable spacing
2. Check mobile (375px, 428px) — no regression, cards still work at 290px
3. Run `npm run lint` and `npx tsc --noEmit` — no errors
4. Test navigation (prev/next buttons) at all breakpoints — carousel still functions correctly
