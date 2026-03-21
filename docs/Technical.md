# TECHSTACK.md - Portfolio Project

This document defines the technological guidelines and development standards for the portfolio project based on **21st.dev** components.

---

##  Core Tech Stack

| Technology | Version | Description | Reason for Choice |
| --- | --- | --- | --- |
| **Next.js** | 16.1.6 | Framework (App Router) | Industry standard, SEO friendly, native RSC support. Turbopack by default. |
| **React** | 19.2.3 | UI Library | Concurrent features, RSC support. |
| **TypeScript** | 5.x (strict) | Language | Type safety, essential for component architecture. |
| **Tailwind CSS** | v4 | Styling | CSS-first config. No `tailwind.config.js` — theme in CSS via `@theme {}`. |
| **shadcn** | 4.0.5 | Base Design System | Built upon shadcn architecture. "base-nova" style. |
| **motion** | 12.36.0 | Animations | Formerly Framer Motion. Import from `motion/react`. |
| **@base-ui/react** | 1.3.0 | Primitives | Unstyled accessible button primitive. |
| **Lucide React** | 0.577.0 | Icons | Standard icon library. |
| **tw-animate-css** | 1.4.0 | CSS Animations | Pre-built animation utilities for Tailwind. |

---

##  Folder Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout (dark-only, Geist Mono font)
│   ├── page.tsx            # Home: Hero + Navigation + Footer
│   ├── globals.css         # Tailwind v4 theme tokens (OKLCH, tracking scale)
│   ├── about/page.tsx
│   └── work/
│       ├── page.tsx        # Project listing
│       └── [slug]/page.tsx # Dynamic case study (bluz, juntos, innoscience)
├── components/
│   ├── ui/           # Atomic shadcn components (button, avatar, tilt, wave-path, etc.)
│   ├── 21st/         # Complex 21st.dev blocks (text-cursor-proximity)
│   ├── hero.tsx
│   ├── navigation.tsx
│   ├── footer.tsx
│   ├── selected-projects.tsx
│   ├── about-services.tsx
│   └── case-study-content.tsx
├── lib/
│   ├── utils.ts      # cn() helper
│   ├── motion.ts     # fadeUp, stagger variants + useReliableInView hook
│   └── projects.ts   # Project data, types, getProjectBySlug, getCaseStudyBySlug
└── hooks/
    └── use-mouse-position-ref.ts
```

---

##  Critical Configurations

### 1. Tailwind Merge Utility

Always use the `cn` function for conditional class manipulation:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2. Tailwind CSS v4 — CSS-First Config

Tailwind v4 removes `tailwind.config.js`. Theme tokens are defined directly in CSS:

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Helvetica Neue', 'Helvetica', 'Arial', system-ui, sans-serif;
  --font-mono: var(--font-geist-mono);

  /* Neo-Grotesque tracking scale */
  --tracking-display: -0.03em;   /* Hero H1, large display text */
  --tracking-heading: -0.02em;   /* Section headings, subtitles */
  --tracking-body: 0.01em;       /* Body text (global default) */
  --tracking-label: 0.08em;      /* Uppercase footer labels */
  --max-width-container: 1280px;
}
```

**Typography:** Helvetica Neue system font stack (Neo-Grotesque). No web font loading — instant render, zero FOUT. Custom tracking utilities defined in `@theme inline` for semantic letter-spacing control.

**Dark-only theme.** OKLCH color palette defined in `:root`. No light mode — `className="dark"` is hardcoded on `<html>`. Use Tailwind CSS variables in components (`bg-background`, `text-foreground`).

### 3. Motion (formerly Framer Motion)

Import from `motion/react` — **not** from `framer-motion`:

```typescript
import { motion } from "motion/react";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export function AnimatedCard() {
  return (
    <motion.div variants={variants} initial="hidden" animate="visible">
      {/* content */}
    </motion.div>
  );
}
```

### 4. Component Pattern

* Prioritize **Client Components** (`"use client"`) only when interactivity is required (motion, Hooks, event handlers).
* Maintain strict TypeScript typing across all components.
* Use `@/components/...` import aliases everywhere.

---

## Instructions for AI (Generation Context)

When generating or editing code for this project, follow these rules:

1. **Style:** Use the "base-nova" style from shadcn.
2. **Variables:** Use Tailwind CSS variables (e.g., `bg-background`, `text-foreground`) for Dark Mode compatibility.
3. **Animations:** Import from `motion/react`. Define animation variants explicitly.
4. **Imports:** Adjust all component import paths to match the `@/components/...` structure.
5. **No `framer-motion`:** Always use the `motion` package instead.
6. **No `tailwind.config.js`:** All theme customization goes in `globals.css` under `@theme {}`.

---

## Project Status

Foundation is complete and actively developed:

- Next.js 16 with App Router: configured
- shadcn (base-nova): configured via `components.json`
- motion: installed, shared variants in `src/lib/motion.ts`
- Theme: dark-only OKLCH palette in `globals.css`
- `cn()` utility: `src/lib/utils.ts`

### Remaining Work

- [ ] `/contact` route (minimal form + "Available for" status)
- [ ] Experience timeline component for `/about`
- [ ] "Life Lately" section for `/about`
- [ ] Headless CMS migration (Phase 2)
