# Remove Redacted Project Routing & Dead Code

**Date:** 2026-03-17
**Status:** Draft

## Problem

The Selected Projects section contains 3 redacted project cards (prism, zenith, nova) that are visually disabled but still have:
- Full case study data objects generated via `makePlaceholderCaseStudy()`
- Static route generation in `generateStaticParams()` producing pages at `/work/prism`, `/work/zenith`, `/work/nova`
- A dedicated rendering branch in `ProjectCard` for the redacted state
- A `redacted?: boolean` field on the `Project` interface

This dead code increases bundle weight, generates unnecessary static pages, and adds maintenance surface area.

## Solution

**Approach:** Full dead code sweep — remove all data, routing, rendering, and type definitions associated with redacted projects.

### Changes

**`src/lib/projects.ts`**
1. Remove `redacted?: boolean` from `Project` interface
2. Delete prism, zenith, nova entries from `PROJECTS` array
3. Delete `makePlaceholderCaseStudy()` function
4. Replace `CASE_STUDIES` construction with inline case study objects for the 3 active projects only

**`src/components/selected-projects.tsx`**
1. Delete the `if (project.redacted)` rendering branch in `ProjectCard`
2. Component now only renders the active card path (Link → Tilt → card content)

### What stays unchanged
- `/work/[slug]` dynamic route — still serves active project case studies
- `CaseStudyContent` component — renders case study pages
- `getProjectBySlug()` and `getCaseStudyBySlug()` helpers — still used by active routes
- Navigation, Footer, Tilt, all UI components

### Automatic effects
- `generateStaticParams()` iterates `PROJECTS` — removing entries automatically stops static page generation for those slugs
- Navigating to `/work/prism` etc. will return 404 via the existing `notFound()` guard

## Verification
1. `npm run lint && npx tsc --noEmit` — no errors
2. `npm run build` — succeeds, no static pages for prism/zenith/nova
3. `/work` page shows exactly 3 project cards
4. `/work/meridian`, `/work/solstice`, `/work/atlas` load correctly
5. `/work/prism` returns 404
