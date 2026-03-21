# Juntos Case Study Copy Rewrite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Juntos case study copy to be concise, empathy-led, and compelling — with a new title and highest-grade mention in results.

**Architecture:** Single-file string content update in `src/lib/projects.ts`. Two locations: `PROJECTS[1].name` (line 63) and the `JUNTOS_CASE_STUDY` object (lines 286–345). No component or structural changes.

**Tech Stack:** TypeScript (string literals only)

**Spec:** `docs/superpowers/specs/2026-03-20-juntos-copy-rewrite-design.md`

---

### Task 1: Update Project Name

**Files:**
- Modify: `src/lib/projects.ts:63`

- [ ] **Step 1: Update PROJECTS[1].name**

Change line 63 from:
```typescript
    name: "Juntos Remote Learning Platform",
```
To:
```typescript
    name: "A Remote Learning Platform That Children Will Actually Like to Use",
```

- [ ] **Step 2: Run typecheck**

Run: `npx tsc --noEmit`
Expected: PASS (no type errors — still a string)

---

### Task 2: Update Short Description and Main Problem

**Files:**
- Modify: `src/lib/projects.ts:288-298`

- [ ] **Step 1: Update description (lines 288–289)**

Change from:
```typescript
  description:
    "A child-centered remote learning platform born during COVID-19, replacing rigid adult tools with an immersive virtual school — designed to protect engagement and development for young elementary students.",
```
To:
```typescript
  description:
    "When COVID-19 pushed classrooms online, children got tools built for boardrooms. Juntos replaced them with a virtual school that feels like walking through real hallways — designed for kids aged 6–8.",
```

- [ ] **Step 2: Update mainProblem.description (lines 297–298)**

Change from:
```typescript
    description:
      "When schools went remote overnight, children were thrown onto platforms built for corporate meetings. The result: plummeting engagement, frustrated parents, and teachers struggling to adapt lesson plans to tools that fought them at every step.",
```
To:
```typescript
    description:
      "COVID-19 turned classrooms into browser tabs overnight. Children, parents, and teachers were all failed by tools that were never designed for learning.",
```

---

### Task 3: Update Problem Blocks

**Files:**
- Modify: `src/lib/projects.ts:300-314`

- [ ] **Step 1: Update miniProblems[0] (lines 300–303)**

Change title and description from:
```typescript
      {
        title: "Hostile Learning Environments",
        description:
          "Zoom, Teams, and Meet were designed for adults in offices — not 7-year-olds learning to read. Rigid interfaces, complex controls, and zero playfulness made remote classes feel like punishment.",
      },
```
To:
```typescript
      {
        title: "Tools Built for Boardrooms, Not Bedrooms",
        description:
          "A seven-year-old staring at a 5×5 Zoom grid isn't learning — they're enduring. Corporate video tools offered no playfulness, no warmth, and nothing a child could figure out alone.",
      },
```

- [ ] **Step 2: Update miniProblems[1] (lines 305–308)**

Change from:
```typescript
      {
        title: "Lost Social Connection",
        description:
          "School isn't just lessons — it's hallways, playgrounds, and library corners. Remote learning stripped away every informal space where children build social skills and emotional bonds.",
      },
```
To:
```typescript
      {
        title: "The Hallway Disappeared",
        description:
          "School is hallways, playgrounds, and library corners. Remote learning erased every informal space where children build friendships and emotional resilience — leaving only a mute button.",
      },
```

- [ ] **Step 3: Update miniProblems[2] (lines 310–313)**

Change from:
```typescript
      {
        title: "Fragmented Stakeholder Experience",
        description:
          "Parents became involuntary IT support. Teachers juggled unfamiliar tools mid-lesson. No single platform addressed the distinct needs of students, parents, and educators simultaneously.",
      },
```
To:
```typescript
      {
        title: "Three Users, Zero Shared Solutions",
        description:
          "Parents became unwilling IT support. Teachers fought unfamiliar interfaces mid-lesson. Children just wanted to see their friends. No existing platform served all three at once.",
      },
```

---

### Task 4: Update Solution Blocks

**Files:**
- Modify: `src/lib/projects.ts:317-339`

- [ ] **Step 1: Update solutions[0] (lines 318–322)**

Change title and description from:
```typescript
    {
      title: "Immersive Virtual School",
      description:
        "We designed a platform that mirrors real school architecture — navigable classrooms, a library, a game room, and dedicated video call spaces. Students 'walk' through environments, raise hands to ask questions, and interact in familiar ways. The goal: make remote feel less remote.",
```
To:
```typescript
    {
      title: "A School You Can Walk Through",
      description:
        "Students navigate classrooms, a library, and a game room — raising hands, joining calls, and discovering spaces the way they would in a real building. Remote stops feeling remote.",
```

- [ ] **Step 2: Update solutions[1] (lines 324–328)**

Change from:
```typescript
    {
      title: "Child-First Visual Language",
      description:
        "Playful colors, friendly rounded icons, and simple typography replaced the corporate gray of standard conferencing tools. Every visual decision was filtered through one question: would a 7-year-old feel welcome here? Buttons are large, interactions are intuitive, and the tone is warm throughout.",
```
To:
```typescript
    {
      title: "Designed for Six-Year-Old Eyes",
      description:
        "Playful colors, rounded icons, and oversized buttons replaced corporate gray. Every visual choice passed one filter: would a six-year-old feel welcome here?",
```

- [ ] **Step 3: Update solutions[2] (lines 330–333)**

Change from:
```typescript
    {
      title: "Multi-Stakeholder Design",
      description:
        "Three personas — student, parent, teacher — drove separate but interconnected user flows. Parents get a dedicated chat channel and progress visibility. Teachers control classroom tools without technical friction. Students just see a fun place to learn. Research with all three groups validated every major decision.",
```
To:
```typescript
    {
      title: "One Platform, Three Experiences",
      description:
        "Parents see progress and a direct chat channel. Teachers control classroom tools without friction. Students just see a fun place to learn. Three separate flows, validated by research with all three groups.",
```

---

### Task 5: Update Results

**Files:**
- Modify: `src/lib/projects.ts:341-343`

- [ ] **Step 1: Update results.description**

Change from:
```typescript
  results: {
    description:
      "Qualitative usability testing with students, parents, and teachers confirmed the platform's core thesis: children engage more when digital environments feel like school, not spreadsheets. Test participants navigated the interface intuitively, and the immersive approach measurably improved comprehension and willingness to participate in remote sessions.",
  },
```
To:
```typescript
  results: {
    description:
      "Usability testing confirmed the core thesis: children engage more when digital spaces feel like school, not spreadsheets. Students navigated the interface intuitively, participation rose visibly, and the project earned the highest grade in the graduating class.",
  },
```

---

### Task 6: Verify and Commit

- [ ] **Step 1: Run lint and typecheck**

Run: `npm run lint && npx tsc --noEmit`
Expected: PASS — all clean

- [ ] **Step 2: Run dev server and visually verify**

Run: `npm run dev`
Check:
- Homepage project card shows new title without layout breakage
- Case study page (`/work/juntos`) shows updated title, problems, solutions, and results

- [ ] **Step 3: Verify no accidental edits to other case studies**

Run: `git diff src/lib/projects.ts`
Confirm changes are limited to line 63 and lines 286–345

- [ ] **Step 4: Commit**

```bash
git add src/lib/projects.ts
git commit -m "content: rewrite Juntos case study copy — empathy-led, concise, add highest grade result"
```
