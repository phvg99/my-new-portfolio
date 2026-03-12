#  Portfolio OS: Senior Product Designer Edition

###  High-Level Vision

A high-fidelity, interactive portfolio built for the 2026 design market. It combines the **Playground/Vercel** aesthetic—clean typography, subtle blurs, and physics-based interactions—with the rigorous case study structure required by **Big Tech (Google, Stripe, Airbnb) recruiters.**

> **Status:** Phase 1 - Core Architecture & Shell (Placeholder Content)

---

###  Design Language (The "Vibe")

* **Aesthetic:** "Premium Editorial." Think high-contrast, large-scale typography, and heavy use of whitespace.
* **Interactions:** Using **21st.dev** and **Framer Motion** for spring-based transitions, magnetic buttons, and glassmorphism.
* **Theme:** Dual-mode (System preference) with a "Deep Midnight" dark mode and "Paper White" light mode.
* **Grid:** 12-column flexible grid with strict adherence to **8px spacing systems**.

---

### 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS + Lucide Icons
* **Components:** 21st.dev + Radix UI (for accessibility)
* **Animations:** Framer Motion
* **Content:** Local MDX (Phase 1) → Headless CMS (Phase 2)

---

###  Information Architecture (The Sitemap)

| Route | Content Focus | Component Goal |
| --- | --- | --- |
| `/hero` | **The Hook.** Hero, Bento-grid of expertise, and "Selected Work" previews. | High-impact visual entry. |
| `/work` | **The Proof.** 2-3 Deep-dive placeholders using a long-form scroll template. | Narrative-heavy, S.T.A.R. format. |
| `/about` | **The Human.** Experience timeline, "Life Lately," and tech stack. | Social proof & Personality. |
| `/contact` | **The Conversion.** Minimal form + "Available for" status indicator. | Frictionless CTA. |

---

###  Implementation Roadmap

#### Phase 1: Foundation (Current)

* [ ] Setup Next.js with Tailwind and Framer Motion.
* [ ] Build **Navigation Bar**: Floating "Dock" style or minimalist glass header.
* [ ] Build **Hero Section**: Typographic-led with a 21st.dev "Sparkle" or "Noise" effect.
* [ ] Build **Footer**: High-utility footer with local time and status.

#### Phase 2: Shells & Placeholders

* [ ] Create a **Case Study Template**: Vertical scroll with sticky sidebars for "Role, Tools, Outcome."
* [ ] Build the **Testimonial Slider**: Micro-interaction focused cards.
* [ ] Build **Experience Component**: Clean vertical timeline with auto-layout.

#### Phase 3: Content Injection

* [ ] Replace placeholders with actual JSON/MDX data for the 3 main projects.

---

###  Strategic UX Writing (Microcopy Guidelines)

* **Voice:** Professional yet approachable. Avoid "Design Evangelist" fluff.
* **Keywords:** Scalable Systems, Cross-functional Leadership, Data-Driven, User-Centric.
* **CTA:** Instead of "Send Message," use "Start a Conversation" or "Let’s Build Something."

---

###  Claude Code Commands (Quick Start)

To maintain the "vibe coding" flow, use these prompts for the next steps:

* *"Scaffold the project directory using App Router and a /components/ui folder for 21st.dev components."*
* *"Create a responsive navigation bar that hides on scroll and uses a glassmorphism background."*
* *"Implement a Hero section with a magnetic CTA button and an H1 using a premium serif font."*

---