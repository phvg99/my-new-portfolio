# TECHSTACK.md - Portfolio Project

This document defines the technological guidelines and development standards for the portfolio project based on **21st.dev** components.

---

##  Core Tech Stack

| Technology | Version | Description | Reason for Choice |
| --- | --- | --- | --- |
| **Next.js** | 15 | Framework (App Router) | Industry standard for React, SEO friendly, native RSC support. Turbopack enabled by default. |
| **TypeScript** | 5.x (strict) | Language | Type safety, essential for 21st.dev components. |
| **Tailwind CSS** | v4 | Styling | CSS-first config system. No `tailwind.config.js` — theme defined in CSS via `@theme {}`. |
| **shadcn/ui** | latest | Base Design System | 21st.dev is built upon the shadcn architecture. "New York" style. |
| **motion** | latest | Animations | Formerly Framer Motion. Required for transitions and visual effects. Import from `motion/react`. |
| **Lucide React** | latest | Icons | Standard icon library used in the examples. |

---

##  Suggested Folder Architecture

To maintain organization between base components and complex 21st.dev components:

* `src/components/ui/`: Atomic **shadcn** components (Buttons, Inputs, Basic Cards).
* `src/components/21st/`: Complex components copied from **21st.dev** (Hero sections, bento grids, etc.).
* `src/lib/`: Utilities like `utils.ts` (the `cn` function for Tailwind class merging).
* `src/app/`: Routes and system pages.

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

@theme {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Use Tailwind CSS variables in components (`bg-background`, `text-foreground`) for automatic dark/light mode support.

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

1. **Style:** Use the "New York" style from shadcn/ui.
2. **Variables:** Use Tailwind CSS variables (e.g., `bg-background`, `text-foreground`) for Dark Mode compatibility.
3. **Animations:** Import from `motion/react`. Define animation variants explicitly.
4. **Imports:** Adjust all component import paths to match the `@/components/...` structure.
5. **No `framer-motion`:** Always use the `motion` package instead.
6. **No `tailwind.config.js`:** All theme customization goes in `globals.css` under `@theme {}`.

---

##  Next Steps

1. Initialize the project:
   ```bash
   npx create-next-app@latest
   ```
2. Configure shadcn/ui (updated CLI):
   ```bash
   npx shadcn@latest init
   ```
3. Install motion:
   ```bash
   npm install motion
   ```
4. Implement the theme system (Light/Dark mode) in `globals.css` using `@theme {}`.
5. Add `cn()` utility to `src/lib/utils.ts`.
