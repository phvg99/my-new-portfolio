# Shader Hero Redesign

## Context

The current hero section is a text-only Framer Motion component. We're replacing it with a full-viewport Three.js shader animation from 21st.dev, overlaid with minimal centered text. This creates a high-impact first impression aligned with the premium editorial aesthetic.

## Design

### New Component: `src/components/ui/shader-animation.tsx`

The exact component code provided by the user (from 21st.dev prompt). A `"use client"` component that renders a full-size Three.js WebGL shader (colorful concentric ring animation on black). Manages its own lifecycle including explicit disposal of renderer, geometry, and material on unmount.

**SSR handling:** Import via `next/dynamic` with `{ ssr: false }` in the hero component, since Three.js requires browser APIs (`window`, `document`, WebGL context).

**WebGL fallback:** Wrap initialization in a try/catch. If WebGL is unavailable, the component renders nothing — the hero's black background serves as the fallback.

**`prefers-reduced-motion`:** Check `window.matchMedia('(prefers-reduced-motion: reduce)')` and pause the animation loop if set, showing a static frame instead.

### Modified: `src/components/hero.tsx`

Becomes a full-viewport container:

- `<section>` with `relative h-screen overflow-hidden bg-black`
- `<ShaderAnimation />` loaded via `next/dynamic({ ssr: false })` as background
- Absolute-positioned overlay centered with `z-10`:
  - "Pedro Vidal" — large heading, white, tight tracking
  - "Product Designer" — smaller text below, white/muted
- Responsive typography: `text-4xl md:text-6xl lg:text-7xl` for name, scaled subtitle
- No Framer Motion animations (shader provides visual interest)
- `pointer-events-none` on text overlay so it doesn't block shader interaction

### New: Intro section in `page.tsx`

A brief text block inserted between `<Hero />` and the first `<hr>`:

- Centered, max-width constrained (`max-w-4xl`), generous vertical padding
- Contains: "Senior Product Designer — crafting scalable, user-centric digital experiences for Big Tech."
- Uses `text-foreground` / `bg-background` (theme-aware)
- Fade-up entrance animation using Framer Motion (reuses existing `motion` dependency)

### Navigation Compatibility

The existing navigation is already `fixed` with `z-50` and `bg-background/80 backdrop-blur-xl` — it floats over the full-screen hero with no changes needed.

### Dependencies

- `three` (npm) — Three.js runtime
- `@types/three` (npm, devDep) — TypeScript types

**Bundle size:** The `ShaderAnimation` is dynamically imported, so Three.js (~150KB gzipped) is code-split and does not block initial page render.

### Dark/Light Mode

- Hero shader renders on black — white overlay text works in both themes
- Intro section below uses standard Tailwind theme tokens

## Scope

- **In:** ShaderAnimation component, hero rewrite, intro section, `three` dependency, dynamic import for SSR safety, reduced-motion support
- **Out:** Navigation changes, other sections, CTA buttons, scroll-triggered shader effects
