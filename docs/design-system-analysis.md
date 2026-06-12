# Design System Analysis — "Stephanie" (Retro-Editorial Boldness)

> **Status:** Reference / study only. No `src/` code has been changed. This document analyzes the
> design system that will drive the upcoming portfolio re-design.

## Source

A complete design handoff bundle exported from **Claude Design** (`claude.ai/design`), saved to the
repo at [`references/stephanie-design-system/`](../references/stephanie-design-system/). Start
points inside the bundle:

| File | What it is |
|---|---|
| [`project/README.md`](../references/stephanie-design-system/project/README.md) | The full written system (voice, foundations, motion, iconography) |
| [`project/colors_and_type.css`](../references/stephanie-design-system/project/colors_and_type.css) | All tokens as CSS variables + base resets + semantic classes |
| [`project/SKILL.md`](../references/stephanie-design-system/project/SKILL.md) | Agent skill manifest with the non-negotiables |
| [`project/ui_kits/portfolio/`](../references/stephanie-design-system/project/ui_kits/portfolio/) | Click-thru UI kit (Landing / Works / Bio / Contact) in JSX |
| [`project/assets/`](../references/stephanie-design-system/project/assets/) | Pixel sprites + italic wordmark SVGs |
| [`chats/chat1.md`](../references/stephanie-design-system/chats/chat1.md) | Originating brief + build transcript (intent lives here) |

> **Persona note:** the bundle is themed around a fictional persona — *"Stephanie, a Paris-based
> creative developer."* Treat the name, copy, and identity as **placeholders**. The reusable asset
> is the **visual + structural system**; the real identity gets swapped in during the redesign.

---

## 1. Identity & vibe

The one-phrase description is **"retro-editorial boldness."** From the brief: *"a lo-fi beat with a
French house influence — structured rhythm, but with soul. Confident. Direct. Creative without
trying too hard."*

The system lives in one core tension: **precision vs. playfulness.**
- **Precision:** a strict 8px grid, a visible blueprint grid, flat color blocking, square corners,
  one canvas color, two type families with non-overlapping jobs.
- **Playfulness:** italic serif headlines that overflow and break across lines, pixel-art flowers
  scattered "almost randomly," and a clashing yellow that pops where you least expect it.

It is *editorial web meets retro pixel art* — sophisticated and playful, modern and nostalgic.

---

## 2. Design tokens

Distilled from
[`colors_and_type.css`](../references/stephanie-design-system/project/colors_and_type.css). Use
these variables; **do not invent new hex codes.**

### Color

| Token | Value | Role |
|---|---|---|
| `--blue` | `#1238E6` | **The canvas.** Fills every screen edge-to-edge. |
| `--blue-deep` | `#0E2BB8` | Hover / pressed wash |
| `--blue-bright` | `#2A55FF` | Highlight / focus glow |
| `--white` | `#FFFFFF` | All content text |
| `--white-72 / 56 / 32 / 16 / 08` | `rgba(255,255,255, …)` | Secondary copy / meta / placeholder / hairline rule / **grid lines** |
| `--yellow` | `#FFD60A` | The lone UI accent |
| `--yellow-warm` | `#FFC400` | Button / chip fill |
| `--pixel-red` | `#E63946` | **Pixel art only** |
| `--pixel-green` / `--pixel-green-dk` | `#2E8B3D` / `#1A5C2A` | **Pixel art only** |
| `--pixel-brown` / `--pixel-skin` | `#5C3A1E` / `#F4C4A8` | Sprite stems/hair / avatar skin |

### Type scale

| Token | Value | Use |
|---|---|---|
| `--t-display-xl` | `clamp(96px, 14vw, 220px)` | Hero word |
| `--t-display-lg` | `clamp(64px, 9vw, 144px)` | Page titles |
| `--t-display-md` | `clamp(40px, 5vw, 72px)` | Secondary headlines |
| `--t-display-sm` | `28px` | Card / inline serif |
| `--t-mono-xs … xl` | `11 / 13 / 15 / 18 / 22px` | Footnote → numeric/quote |
| `--tracking-tight/normal/loose/mega` | `-0.01 / 0.04 / 0.12 / 0.18em` | Mono is **always** ≥`loose` when uppercase |
| `--lh-tight/snug/body/loose` | `1.0 / 1.2 / 1.55 / 1.8` | Body ≥1.55 to breathe against the blue |

### Spacing — strict 8px base

`--s-1`…`--s-10` = `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`.

### Structure & motion

| Token | Value | Note |
|---|---|---|
| `--grid-cell` | `80px` | Blueprint grid cell |
| `--grid-stroke` | `1px` | Hairline |
| `--radius-0` | `0px` | **Default — everything is square** |
| `--shadow-none` | `none` | The design refuses depth |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances |
| `--ease-snap` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes |
| `--dur-fast/base/slow` | `120 / 200 / 400ms` | Micro / default / page-level |

---

## 3. Typography system

Two voices that **never compete**:

- **Display — Playfair Display *Italic*** (`--font-display`, fallbacks Cormorant Garamond, Georgia).
  High-contrast transitional serif. **Always italic.** Used only for emotional headlines
  (`Hi, I'm Stephanie.`, `Selected Works`, `Say hello`). Allowed to overflow and wrap dramatically
  (`Say he` / `llo` is a deliberate break). Weight 500–700.
- **Body / UI — JetBrains Mono** (`--font-mono`, fallbacks IBM Plex Mono, ui-monospace). Everything
  else: nav, labels, metadata, body, form fields, buttons. **Uppercase + loosely tracked**
  (≥`0.12em`) whenever used as a label. Weight 400–600. Body line-height ≥1.55.

Semantic classes ship in the CSS: `.t-display-xl/lg/md/sm`, `.t-eyebrow`, `.t-nav`, `.t-label`,
`.t-meta`, `.t-body`, `.t-body-lg`, `.t-code`. Prefer these over styling tags directly.

> **Caveat:** fonts are free Google Fonts *substitutes* for the references. If the real site uses a
> commercial face (Freight Display Italic, PP Editorial Old, Söhne/Berkeley Mono), drop the files in
> a `fonts/` dir and re-point `--font-display` / `--font-mono`.

---

## 4. Color system

- **Blue owns every screen edge-to-edge.** No white pages, no light mode, no dark mode. *This is
  the mode.*
- **White is the only content text color** — no tinted/off-whites. Opacity ladder (72/56/32/16/8%)
  handles hierarchy: secondary copy → meta → placeholder → hairline rule → grid lines.
- **Yellow `#FFD60A` is the sole accent.** Used for: active nav (underline + fill), highlighted
  labels, primary CTA hover, the `DESIGNER` chip, featured project tags, and inside pixel art.
- **Red & green appear *only* inside pixel sprites** — never on a button, as text, or as a border.
- **No gradients, no shadows, no glass, no glow.** Flat color blocks and outlines only.

---

## 5. Layout & grid

- **Blueprint grid** overlaid on the blue at all times: white-8% lines, 1px, ~80px cells, applied
  via `.grid-bg`. Visible but never competing; honest — components align to the cells.
- Generous outer margins (**48–96px** desktop). The blue *is* the whitespace — treat large empty
  areas above/below headlines as intentional.
- **Strict left-aligned** text columns; **right-aligned meta** in headers/footers (socials,
  copyright).
- Headlines span 60–100% of viewport width and wrap aggressively.
- **Project tiles are portrait (3:4 / 2:3), 2-column grid** on desktop.
- Container reference width is **1280–1400px** across the kit.

---

## 6. Components inventory

All cite [`ui_kits/portfolio/`](../references/stephanie-design-system/project/ui_kits/portfolio/).

| Component | Source | Notes |
|---|---|---|
| **Header / nav** | [`Header.jsx`](../references/stephanie-design-system/project/ui_kits/portfolio/Header.jsx) | Fixed top bar, `1fr auto 1fr` grid. `PORTFOLIO 2024` left, `WORKS·ABOUT·CONTACT` center (WORKS has a `▼`), `IG·LI·TW` socials right. Active = yellow text + 2px yellow underline. |
| **Landing hero** | [`LandingScreen.jsx`](../references/stephanie-design-system/project/ui_kits/portfolio/LandingScreen.jsx) | Centered italic wordmark with the dot of the `i` replaced by an inline sunflower sprite; eyebrow `CREATIVE DEVELOPER` / subline `BASED IN PARIS`; three corner stamps (`AVAILABLE FOR FREELANCE`, `↓ SCROLL`, `© 2024`). |
| **Project tile** | [`WorksScreen.jsx`](../references/stephanie-design-system/project/ui_kits/portfolio/WorksScreen.jsx) | Portrait 3:4, dark-wash bg + 16% white border, sprite centered, footer = `NN / CATEGORY` (yellow) + italic serif title. **Featured variant** = solid yellow tile, blue text, no sprite. |
| **Bio timeline** | [`BioScreen.jsx`](../references/stephanie-design-system/project/ui_kits/portfolio/BioScreen.jsx) | `Hi, I'm Stephanie.` + 2 lede paragraphs + Expertise/Tools two-column + Journey timeline (dot + left rule, active row is yellow) + pixel avatar with `DESIGNER` chip. |
| **Contact form** | [`ContactScreen.jsx`](../references/stephanie-design-system/project/ui_kits/portfolio/ContactScreen.jsx) | `Say he`/`llo` two-line headline, lede, email/location stamps; **bottom-rule-only fields** (no boxes), placeholder at white-32; `SEND MESSAGE` button with sprite. |
| **Button** | `colors_and_type.css` | Flat white rectangle, mono uppercase blue text, `18px 28px` pad, radius 0. Hover → fill yellow (text stays blue). Press → `translateY(1px)`. |
| **Field** | `colors_and_type.css` | Transparent, bottom 1px rule only; focus → rule turns yellow. |
| **Pixel scatter** | [`PixelScatter.jsx`](../references/stephanie-design-system/project/ui_kits/portfolio/PixelScatter.jsx) | Absolutely-positioned decorative sprite layer; exports `LANDING_SCATTER` (8 sprites) and `SECTION_SCATTER` (3 sprites). |

### Interaction states

| State | Effect |
|---|---|
| Link hover | Text → yellow, 200ms |
| Active nav | Yellow text + 2px yellow underline, persistent |
| Button hover | Bg white → yellow, text stays blue |
| Button press | `translateY(1px)`, 120ms |
| Field focus | Bottom rule → yellow, placeholder fades |
| Sprite hover | Optional 90° snap rotate, 200ms |

Motion is **sharp, never bouncy.** Hover = color change only (no scale/translate/shadow). No
parallax, no scroll-jacking.

---

## 7. Iconography & decoration

- **No icon font, no emoji.** Adding a generic icon system would dilute the type-first identity.
- **Glyphs as icons** in mono: `↓` scroll, `▼` dropdown, `→` forward, `/` separator (`03 / MOTION`),
  `+` additive. Always white, body/label size.
- **Social links are 2-letter mono abbreviations** (`IG`, `LI`, `TW`) — a strong brand tell, hover
  → yellow. Preserve this.
- **The "icon library" is 6 pixel sprites** in
  [`assets/`](../references/stephanie-design-system/project/assets/): `pixel-sunflower` (signature),
  `pixel-flower-red`, `pixel-cross-yellow`, `pixel-cross-green`, `pixel-cross-tiny`, `pixel-avatar`
  (bio only), plus `wordmark.svg`. Use **3–8 per screen**; one sprite may overlap a serif glyph once
  per page.
- **New sprites must match:** 8px square pixels, flat fills, restricted palette, `crispEdges`
  rendering, `viewBox` divisible by 8.
- If functional icons are unavoidable: mono unicode first, then Lucide stroke-1.5 from CDN — never
  solid/filled, never colored.

---

## 8. Content voice

- **First person, singular** ("I'm…", "I bridge…"). Never corporate "we" or third-person.
- **Direct second-person** to the reader ("Tell me about your project").
- **Confident, not boastful.** No superlatives. The work is the proof.
- **Casing:** UPPERCASE for nav/labels/eyebrows/metadata/buttons; sentence case for long-form prose;
  lowercase italic for the wordmark only; Title Case in display headlines.
- **Don'ts:** no emoji (pixel art *is* the emoji), no exclamation marks, no "Welcome to my
  portfolio!", no buzzwords (`synergy`, `seamless`, `cutting-edge`), no "Click here / Read more".

---

## 9. Gap analysis vs the current portfolio

The current site (`CLAUDE.md`, [`src/app/globals.css`](../src/app/globals.css),
[`docs/README.md`](README.md)) is a **fundamentally different** direction.

| Dimension | Current portfolio | "Stephanie" system | Verdict |
|---|---|---|---|
| Theme | Deep Midnight dark (`oklch(0.058 0 0)` bg, white fg) | Electric blue `#1238E6` canvas, white fg | **Full replacement** |
| Accent | Monochrome; rainbow gradient utility | Single yellow `#FFD60A`; pixel-only red/green | **Replace** |
| Display font | Helvetica Neue / Inter (Neo-Grotesque) | Playfair Display **Italic** serif | **Replace + add web font** |
| Mono font | Geist Mono | JetBrains Mono | **Swap** |
| Corners | `--radius: 0.625rem` (rounded) | `0` everywhere (square) | **Replace** |
| Depth | Glassmorphism, blurs, shadows, springs | Flat — no shadow/gradient/glass/glow | **Remove depth** |
| Spacing | 8px system, 1280px container | 8px system, 1280–1400px, 80px blueprint grid | **Compatible** ✅ |
| Grid | 12-col | 12-col + visible blueprint overlay | **Extend** |
| Motion | motion/react springs, magnetic buttons | Sharp cubic-bezier, color-only hovers, no bounce | **Re-tune** |
| Persona | Senior Product Designer (Big Tech recruiters) | Creative developer, Paris (placeholder) | **Reconcile** (open question) |
| Routes | `/`, `/work`, `/work/[slug]`, `/about` | Landing, Works, Bio (About), Contact | **Mostly maps**; add `/contact` |
| Decoration | None | Pixel-sprite scatter | **Net-new** |

**Reusable as-is:** the 8px spacing scale, 1280px container, 12-column grid discipline, Next.js +
Tailwind v4 CSS-first token architecture, the existing route structure (Work ≈ Works, About ≈ Bio),
and `motion/react` (re-tuned to sharp easings).

**Net-new / replace:** color tokens, both fonts, square corners, flat (no-depth) styling, pixel
sprite assets + scatter layer, blueprint grid background, italic-serif headline treatment, voice
rewrite, and a `/contact` page.

---

## 10. Migration roadmap (high-level, non-binding — future work)

> Not part of this task. Recorded so the redesign has a starting shape.

1. **Tokens** — replace the OKLCH palette in [`src/app/globals.css`](../src/app/globals.css) with
   the blue/white/yellow + pixel tokens; set radius to `0`; add the `.grid-bg` blueprint utility and
   the sharp easing/duration tokens.
2. **Fonts** — load Playfair Display Italic + JetBrains Mono (or commercial equivalents), re-point
   `--font-sans`/`--font-mono`, drop unused Inter/Geist/Helvetica.
3. **Header/nav** — rebuild to the `1fr auto 1fr` fixed bar with yellow active state + 2-letter
   socials.
4. **Screens** — port Landing → Works → Bio(About) → Contact, recreating each JSX prototype as
   React Server/Client components matching the repo's conventions (`cn()`, `@/components`, motion in
   `lib/motion.ts`).
5. **Pixel layer** — copy sprite SVGs into `public/`/`assets`, build a `PixelScatter` component,
   apply 3–8 per screen.
6. **Content & persona** — swap the placeholder "Stephanie / Paris" identity and copy for the real
   identity, rewritten in the system's voice; reconcile creative-developer vs product-designer
   positioning.
7. **Polish** — verify flat (no shadow/gradient), square corners, sharp motion, grid alignment.

---

## 11. Caveats & open questions

Carried from the bundle plus our own:

- **Fonts are Google substitutes** — confirm whether a commercial display/mono face is intended.
- **Exact blue `#1238E6` was sampled by eye** (Pantone Reflex Blue is close) — confirm the brand hex.
- **Motion specs are educated guesses** — no animation reference was provided.
- **No real imagery yet** — only pixel art exists; project/case-study imagery needs to be added.
- **The pixel avatar is approximated** — pose/badge match, exact pixels may differ.
- **Persona mismatch (our open question):** the system is written for a "creative developer in
  Paris," but the current portfolio targets "Senior Product Designer / Big Tech recruiters." Decide
  the real positioning before the content rewrite.
- **Direction shift (our open question):** this is a dark→electric-blue, rounded→square,
  depth→flat overhaul — a deliberate, large change to confirm before implementation begins.
