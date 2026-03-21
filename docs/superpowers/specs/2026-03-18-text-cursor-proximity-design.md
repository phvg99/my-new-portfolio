# Text Cursor Proximity Effect — Hero Heading

**Date:** 2026-03-18
**Status:** Draft
**Scope:** Apply 21st.dev "Text Cursor Proximity" animation to the "Pedro Vidal" `<h1>` on the home page hero section.

---

## Context

The portfolio hero currently displays a static "Pedro Vidal" heading. To add a premium interactive touch that rewards cursor exploration, we're integrating the Text Cursor Proximity component from 21st.dev. This effect makes individual letters respond to cursor distance — scaling up and shifting color as the mouse approaches. The goal is a subtle, editorial-quality interaction that impresses Big Tech recruiters without compromising accessibility or readability.

## Approach: Direct Integration in Hero

Replace the static `<h1>` text with the `TextCursorProximity` component directly inside `hero.tsx`. Use the hero `<section>` as the containerRef.

**Why this approach:**
- Simplest integration — hero is already a client component
- `useMousePositionRef` listens on `window`, so `pointer-events-none` on the content overlay is irrelevant
- Full-section containerRef gives the largest natural interaction area
- No unnecessary abstractions for a single-use effect

## Files

### New files
| File | Purpose |
|------|---------|
| `src/hooks/use-mouse-position-ref.ts` | Custom hook tracking mouse/touch position relative to a container ref. From 21st.dev (danielpetho). Creates the `src/hooks/` directory (new convention). |
| `src/components/21st/text-cursor-proximity.tsx` | Per-letter proximity animation component. From 21st.dev. Placed in `21st/` per CLAUDE.md folder conventions (complex 21st.dev blocks). |

### Modified files
| File | Change |
|------|--------|
| `src/components/hero.tsx` | (1) Create `useRef<HTMLDivElement>(null)` for `sectionRef`. (2) Attach `ref={sectionRef}` to the `<section>` element. (3) Replace static "Pedro Vidal" text inside `<h1>` with `<TextCursorProximity>` component, passing `sectionRef` as `containerRef`. Keep all existing Tailwind classes and structure. |

## Effect Parameters (Component API)

The `TextCursorProximity` component accepts a `styles` prop — an object where each key is a CSS property and each value has `{ from, to }` fields representing the default and proximity-activated states.

```tsx
<TextCursorProximity
  label="Pedro Vidal"
  styles={{
    transform: { from: "scale(1)", to: "scale(1.3)" },
    color: { from: "#FFFFFF", to: "#D4AF37" },
  }}
  falloff="gaussian"
  radius={120}
  containerRef={sectionRef}
  className="..." // existing h1 Tailwind classes
/>
```

| Prop | Value | Rationale |
|------|-------|-----------|
| `label` | `"Pedro Vidal"` | The hero heading text |
| `styles.transform` | `{ from: "scale(1)", to: "scale(1.3)" }` | Subtle premium scale — not overpowering |
| `styles.color` | `{ from: "#FFFFFF", to: "#D4AF37" }` | Warm gold accent glow against dark background |
| `falloff` | `"gaussian"` | Smooth, natural decay curve |
| `radius` | `120` | Covers ~3-4 letters at typical heading size |

## Accessibility

- Component renders `<span className="sr-only">{label}</span>` — screen readers get the full text
- Individual letter spans have `aria-hidden="true"` — no noise for assistive tech
- Respect `prefers-reduced-motion`: wrap the effect so letters remain static when the user has requested reduced motion
- No keyboard interaction changes — CTAs remain fully accessible
- Effect is purely visual enhancement; content is fully readable without it

## Responsiveness

- Heading scales via Tailwind (`text-4xl md:text-6xl lg:text-7xl`) — proximity effect is font-size agnostic
- Touch support via `touchmove` listener in `useMousePositionRef`
- On devices without hover, letters remain at default state (white, scale 1) — graceful degradation

## Technical Notes

- `motion` v12.36.0 already installed — no new npm dependencies
- The 21st.dev component uses `useTransform` and `useMotionValue` inside render loops — this works because the array length is fixed per render (label doesn't change). Not a rules-of-hooks violation in practice for static labels.
- `pointer-events-none` on the content div does NOT block the effect — mouse tracking happens via `window` event listeners
- `useAnimationFrame` runs per-frame distance calculations for each letter. For "Pedro Vidal" (10 characters), this is negligible. If performance concerns arise on low-end devices, `prefers-reduced-motion` provides a natural escape hatch.

## Testing (TDD)

Test file: `src/components/21st/__tests__/text-cursor-proximity.test.tsx`

Write failing tests first, then implement. Key test cases:
1. **Renders sr-only text** — confirm `<span className="sr-only">Pedro Vidal</span>` is in the DOM
2. **Renders correct letter count** — "Pedro Vidal" has 10 non-space characters → 10 `aria-hidden` letter spans
3. **Letter spans have aria-hidden** — all individual letter spans have `aria-hidden="true"`
4. **Respects prefers-reduced-motion** — when media query matches, animation frame callback is not active (or effect is disabled)

Note: The proximity animation itself (distance calculations, style interpolation) is a visual/runtime concern tested via manual QA, not unit tests. Focus tests on accessible markup and structural correctness.

## Verification

1. `npm run lint && npx tsc --noEmit` — no type or lint errors
2. `npm run dev` — visit `/`, confirm letters react to cursor movement
3. Test on mobile viewport — confirm touch interaction works
4. Screen reader test — confirm heading is announced correctly
5. Check no layout shift when letters scale (they're `inline-block`)
6. Verify `prefers-reduced-motion` disables the animation
