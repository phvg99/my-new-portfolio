# Juntos Case Study Copy Rewrite

## Context

The Juntos Remote Learning Platform case study needs its copy updated to be more concise, compelling, and empathy-led. Three specific changes requested:
1. New title: "A Remote Learning Platform That Children Will Actually Like to Use"
2. All copy streamlined — shorter, more impactful, sells the idea through vivid moments
3. Results section mentions the project earned the highest grade in the graduating class

## Scope

**Two locations in a single file:** `src/lib/projects.ts`

1. **`PROJECTS[1].name`** (line 63) — the project title used in both the homepage card grid and the case study header
2. **`JUNTOS_CASE_STUDY`** object (lines 286–345) — description, mainProblem, solutions, and results

**No structural/component changes.** The `name` field is already used for long titles (e.g., Bluz: "Creating the perfect design system for a lawyer firm"), so the new title will work in the card grid without layout issues.

## Approach: Empathy-Led Storytelling

Each block opens with a vivid, human moment then pivots to the design insight. 1–3 sentences max per block. The emotional arc makes the "highest grade" result land with impact.

## Copy Changes

### Project Name (PROJECTS[1].name, line 63)
- **Current:** "Juntos Remote Learning Platform"
- **New:** "A Remote Learning Platform That Children Will Actually Like to Use"

### Short Description (JUNTOS_CASE_STUDY.description, line 288–289)
- **Current:** "A child-centered remote learning platform born during COVID-19, replacing rigid adult tools with an immersive virtual school — designed to protect engagement and development for young elementary students."
- **New:** "When COVID-19 pushed classrooms online, children got tools built for boardrooms. Juntos replaced them with a virtual school that feels like walking through real hallways — designed for kids aged 6–8."

### Main Problem Description (mainProblem.description, line 297–298)
- **Current:** "When schools went remote overnight, children were thrown onto platforms built for corporate meetings. The result: plummeting engagement, frustrated parents, and teachers struggling to adapt lesson plans to tools that fought them at every step."
- **New:** "COVID-19 turned classrooms into browser tabs overnight. Children, parents, and teachers were all failed by tools that were never designed for learning."

### Problem 1 (miniProblems[0], lines 300–303)
- **Title:** "Hostile Learning Environments" → "Tools Built for Boardrooms, Not Bedrooms"
- **Copy:** "A seven-year-old staring at a 5×5 Zoom grid isn't learning — they're enduring. Corporate video tools offered no playfulness, no warmth, and nothing a child could figure out alone."

### Problem 2 (miniProblems[1], lines 305–308)
- **Title:** "Lost Social Connection" → "The Hallway Disappeared"
- **Copy:** "School is hallways, playgrounds, and library corners. Remote learning erased every informal space where children build friendships and emotional resilience — leaving only a mute button."

### Problem 3 (miniProblems[2], lines 310–313)
- **Title:** "Fragmented Stakeholder Experience" → "Three Users, Zero Shared Solutions"
- **Copy:** "Parents became unwilling IT support. Teachers fought unfamiliar interfaces mid-lesson. Children just wanted to see their friends. No existing platform served all three at once."

### Solution 1 (solutions[0], lines 318–322)
- **Title:** "Immersive Virtual School" → "A School You Can Walk Through"
- **Copy:** "Students navigate classrooms, a library, and a game room — raising hands, joining calls, and discovering spaces the way they would in a real building. Remote stops feeling remote."

### Solution 2 (solutions[1], lines 324–328)
- **Title:** "Child-First Visual Language" → "Designed for Six-Year-Old Eyes"
- **Copy:** "Playful colors, rounded icons, and oversized buttons replaced corporate gray. Every visual choice passed one filter: would a six-year-old feel welcome here?"

### Solution 3 (solutions[2], lines 330–338)
- **Title:** "Multi-Stakeholder Design" → "One Platform, Three Experiences"
- **Copy:** "Parents see progress and a direct chat channel. Teachers control classroom tools without friction. Students just see a fun place to learn. Three separate flows, validated by research with all three groups."

### Results (results.description, lines 341–343)
- **Current:** Long paragraph about qualitative usability testing.
- **New:** "Usability testing confirmed the core thesis: children engage more when digital spaces feel like school, not spreadsheets. Students navigated the interface intuitively, participation rose visibly, and the project earned the highest grade in the graduating class."

## Verification

1. Update `PROJECTS[1].name` at line 63
2. Update all string fields in the `JUNTOS_CASE_STUDY` object (lines 286–345)
3. Run `npm run lint && npx tsc --noEmit` — must pass clean
4. Run `npm run dev` and verify:
   - Homepage project card shows new title without layout breakage
   - Case study page shows new title, all 3 problem blocks, all 3 solution blocks, and results with updated copy
5. Run `git diff src/lib/projects.ts` to confirm no accidental edits to neighboring case studies
