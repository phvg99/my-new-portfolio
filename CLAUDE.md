# CLAUDE.md — Portfolio OS

## Project Overview

Senior Product Designer portfolio for the 2026 market. Premium editorial aesthetic — high-contrast typography, whitespace-heavy, physics-based interactions. Targets Big Tech recruiters (Google, Stripe, Airbnb).

## Documentation

| File | Purpose |
|------|---------|
| `README.md` | General project vision, design language, and implementation roadmap |
| `Technical.md` | Technical stack guidelines, folder architecture, and development standards |

## Tech Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · shadcn/ui ("New York" style) · Framer Motion · Lucide React · Local MDX (Phase 1) → Headless CMS (Phase 2)

## Folder Structure

```
src/
├── app/              # Routes and pages
├── components/
│   ├── ui/           # Atomic shadcn components
│   └── 21st/         # Complex 21st.dev blocks
└── lib/utils.ts      # cn() and shared utilities
```

## Code Conventions

1. Always use `cn()` from `@/lib/utils` for conditional classes — never raw string concatenation
2. Use Tailwind CSS variables (`bg-background`, `text-foreground`) for dark/light mode
3. `"use client"` only for interactivity (Framer Motion, hooks, events). Default to Server Components.
4. Define Framer Motion animation variants explicitly
5. Use `@/components/...` import aliases everywhere

## Design Language

- **Grid:** 12-column, 8px spacing system
- **Theme:** "Deep Midnight" dark / "Paper White" light (system preference default)
- **Interactions:** Spring transitions, magnetic buttons, glassmorphism, subtle blurs
- **Typography:** Large-scale, high-contrast, premium serif headings

## Routes

| Route | Purpose |
|-------|---------|
| `/hero` | Hero, bento grid of expertise, selected work previews |
| `/work` | Case studies (S.T.A.R. format, sticky sidebars) |
| `/about` | Experience timeline, "Life Lately," tech stack |
| `/contact` | Minimal form + "Available for" status |

## Microcopy

- **Voice:** Professional yet approachable. No fluff.
- **Keywords:** Scalable Systems, Cross-functional Leadership, Data-Driven, User-Centric
- **CTAs:** "Start a Conversation" / "Let's Build Something" — never "Send Message"

---

## Development Workflow

### TDD (Iron Law: no production code without a failing test)

RED → verify fail → GREEN (minimal code) → verify pass → REFACTOR → repeat. Code before test? Delete it.

### Debugging (Iron Law: no fixes without root cause first)

1. **Investigate** — Read errors, reproduce, check `git diff`, trace data flow
2. **Analyze** — Find working examples, compare, list differences
3. **Hypothesize** — One at a time: "X because Y." One variable per test.
4. **Implement** — Failing test → single fix → verify

Stop after 3 failed fixes — likely architectural. Discuss first.

### Linting (Mandatory after every change)

```bash
npm run lint && npx tsc --noEmit
```

No code is "done" until all checks pass.

### Git

```bash
bash "Skills/Essentials & Core/git-pushing/scripts/smart_commit.sh"
bash "Skills/Essentials & Core/git-pushing/scripts/smart_commit.sh" "feat: add feature"
```

---

## Planning & Design

### Brainstorming (before implementation)

Facilitate, don't build. One question at a time. Must reach **Understanding Lock** (5-7 bullet summary + explicit "yes") before designing. Propose 2-3 approaches with trade-offs. Maintain a decision log.

### Planning

Scan context → ask max 1-2 blocking questions → generate plan with atomic, verb-first action items (6-10 steps), naming specific files.

### Architecture

Start simple. Add complexity only when proven necessary. Document trade-offs. Removing complexity is harder than adding it.

---

## Quality Standards

### Code Review

Security (OWASP Top 10, input validation) · Performance (N+1, memory leaks, caching) · Maintainability (SOLID, clean code) · Structured feedback by severity with examples.

### Security

Defense-in-depth · Least privilege · Never trust input · Validate at boundaries · Fail securely · Shift left.

### Kaizen

1. **Incremental** — Smallest viable change. Work → clear → efficient.
2. **Error-Proof** — Types (compile) → validation (runtime) → guards → error boundaries. Validate once at entry.
3. **Standardized** — Follow existing patterns. Consistency > cleverness. Automate via linters/types/tests.
4. **Just-In-Time** — YAGNI. Simplest thing that works. Abstract only after 3+ cases.

---

## Agent Behavior

### 1. Plan Mode Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

### Task Management

1. **Plan First** — Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan** — Check in before starting implementation
3. **Track Progress** — Mark items complete as you go
4. **Explain Changes** — High-level summary at each step
5. **Document Results** — Add review section to `tasks/todo.md`
6. **Capture Lessons** — Update `tasks/lessons.md` after corrections

### Core Principles

- **Simplicity First** — Make every change as simple as possible. Impact minimal code.
- **No Laziness** — Find root causes. No temporary fixes. Senior developer standards.

---

## Portfolio Guidelines

**30-Second Test:** Visitors must instantly know who you are, what you do, your best work, and how to reach you.

**Hero Formula:** Name → what you do → differentiator → CTA

**Show Impact:** "Built a website" → "Increased conversions 40%" · "Designed UI" → "Reduced drop-off 25%"

**Case Study:** Hero image → overview → challenge → role → process → decisions → results → links

**Anti-Patterns:** Template look (add personal touches) · All style no substance (depth > breadth) · Resume website (show, don't tell)
