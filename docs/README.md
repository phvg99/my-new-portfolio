#  Portfolio OS: Senior Product Designer Edition

###  High-Level Vision

A high-fidelity, interactive portfolio built for the 2026 design market. It combines the **Playground/Vercel** aesthetic—clean typography, subtle blurs, and physics-based interactions—with the rigorous case study structure required by **Big Tech (Google, Stripe, Airbnb) recruiters.**

> **Status:** Phase 2 — Shells & Content (Foundation complete, case studies with real data)

---

###  Design Language (The "Vibe")

* **Aesthetic:** "Premium Editorial." Think high-contrast, large-scale typography (Helvetica Neue Neo-Grotesque), and heavy use of whitespace.
* **Interactions:** Using **21st.dev** and **motion** (motion/react) for spring-based transitions, magnetic buttons, and glassmorphism.
* **Theme:** Dark-only "Deep Midnight" palette (OKLCH color space). No light mode.
* **Grid:** 12-column flexible grid with strict adherence to **8px spacing systems**.

---

### 🛠 Tech Stack

* **Framework:** Next.js 16 (App Router) + React 19
* **Styling:** Tailwind CSS v4 (CSS-first config) + Lucide Icons
* **Components:** shadcn 4 (base-nova) + 21st.dev + @base-ui/react + Radix UI
* **Animations:** motion 12 (motion/react)
* **Content:** Local TypeScript data (Phase 1) → Headless CMS (Phase 2)

---

###  Information Architecture (The Sitemap)

| Route | Content Focus | Component Goal |
| --- | --- | --- |
| `/` | **The Hook.** Hero, navigation, footer. | High-impact visual entry. |
| `/work` | **The Proof.** Project listing grid. | Showcase selected projects. |
| `/work/[slug]` | **The Deep Dive.** Case studies (bluz, juntos, innoscience). | Narrative-heavy, problem/solution/results. |
| `/about` | **The Human.** Testimonials, services, wave divider. | Social proof & personality. |

**Planned:** `/contact` — Minimal form + "Available for" status indicator.

---

###  Implementation Roadmap

#### Phase 1: Foundation (Complete)

* [x] Setup Next.js with Tailwind and motion.
* [x] Build **Navigation Bar**: Glassmorphic header with underline animations.
* [x] Build **Hero Section**: TextCursorProximity effect + AnimatedGridPattern.
* [x] Build **Footer**: Local time, status indicator, underline link animations.

#### Phase 2: Shells & Content (In Progress)

* [x] Create **Case Study Template**: Problem/solution/results structure with image carousels.
* [x] Build **Testimonial Slider**: Stagger-animated circular carousel.
* [ ] Build **Experience Component**: Vertical timeline with auto-layout.

#### Phase 3: Polish & Expansion

* [x] Inject real data for 3 projects (bluz, juntos, innoscience).
* [ ] Build `/contact` route.
* [ ] Headless CMS migration.

---

###  Strategic UX Writing (Microcopy Guidelines)

* **Voice:** Professional yet approachable. Avoid "Design Evangelist" fluff.
* **Keywords:** Scalable Systems, Cross-functional Leadership, Data-Driven, User-Centric.
* **CTA:** Instead of "Send Message," use "Start a Conversation" or "Let’s Build Something."

---

### Development Commands

* `npm run dev` — Start dev server (Turbopack)
* `npm run build` — Production build
* `npm run lint` — ESLint
* `npx tsc --noEmit` — Type check

---

###  Re-Design Direction

* **[Design System Analysis](design-system-analysis.md)** — Study of the "Stephanie" *retro-editorial boldness* design system (electric blue canvas, Playfair Display Italic + JetBrains Mono, pixel-art decoration) that will drive the upcoming re-design. Includes token tables, component inventory, a gap analysis vs the current Deep Midnight build, and a migration roadmap.
* **Bundle:** [`references/stephanie-design-system/`](../references/stephanie-design-system/) — the saved Claude Design handoff (tokens, assets, UI kit, screenshots).

---