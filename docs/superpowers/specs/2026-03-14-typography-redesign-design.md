# Typography Redesign: Apple-Inspired Aesthetic

## Context

The portfolio currently uses Geist Sans (body) + Playfair Display (headings) + Geist Mono (unused). The goal is to transition to a modern Apple-inspired typographic system using **Inter** (body) and **Instrument Serif** (headings) for a cleaner, more contemporary editorial feel.

## Decision

- **Body/Sans:** Geist Sans → **Inter** (variable, weights 400-700)
- **Serif/Headings:** Playfair Display → **Instrument Serif** (400 regular)
- **Mono:** Geist Mono → **JetBrains Mono** or keep Geist Mono (low priority, unused)

## Changes Required

### 1. Font Imports — `src/app/layout.tsx`

Replace font imports:

```typescript
// BEFORE
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";

// AFTER
import { Inter, Instrument_Serif } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

Update the `<body>` className to use new font variables.

### 2. CSS Variables — `src/app/globals.css`

No changes needed to the `@theme inline` block — the CSS variable names (`--font-sans`, `--font-serif`, `--font-mono`) stay the same. The values are injected by `next/font` at runtime.

### 3. Component Adjustments

Since all components use `font-serif` and `font-sans` Tailwind classes (not hardcoded font names), **no component file changes are required** for the font swap itself.

However, Instrument Serif has different visual weight than Playfair Display:
- Instrument Serif only has weight 400 (no bold)
- Components currently using `font-serif font-bold` need review

**Files to audit for `font-serif font-bold` or `font-serif font-semibold`:**

| File | Usage | Action |
|------|-------|--------|
| `src/components/hero.tsx` | `font-serif text-5xl font-bold` | Remove `font-bold` — Instrument Serif looks best at normal weight, use size for hierarchy |
| `src/components/footer.tsx` | `font-serif text-3xl font-bold`, watermark `font-bold` | Remove `font-bold` |
| `src/components/navigation.tsx` | `font-serif text-xl font-bold` | Remove `font-bold`, consider `font-medium` on Inter for nav or keep serif at normal weight |
| `src/components/about-services.tsx` | `font-serif text-2xl font-medium` | Change to `font-normal` |
| `src/components/selected-projects.tsx` | `font-serif text-3xl font-bold` | Remove `font-bold` |
| `src/components/21st/testimonials-with-marquee.tsx` | `font-serif text-3xl font-semibold` | Change to `font-normal` |
| `src/components/ui/testimonial-card.tsx` | `font-serif text-sm` | No change needed |

### 4. Documentation Updates

- Update `CLAUDE.md` typography references: replace Geist/Playfair mentions with Inter/Instrument Serif
- Update any README or Technical.md references if they mention specific fonts

## What Does NOT Change

- Tailwind class names (`font-sans`, `font-serif`, `font-mono`)
- CSS variable names (`--font-sans`, `--font-serif`)
- Component structure or layout
- Responsive scaling breakpoints
- The `@theme inline` block in globals.css

## Verification

1. `npm run lint && npx tsc --noEmit` — must pass
2. `npm run dev` — visually verify:
   - Hero heading renders in Instrument Serif at correct size
   - Body text renders in Inter
   - Navigation brand text uses Instrument Serif
   - Footer CTA and watermark use Instrument Serif
   - Dark/light mode both render correctly
3. Check browser DevTools → Computed → font-family to confirm fonts loaded
4. Verify no FOUT (flash of unstyled text) — next/font handles this
