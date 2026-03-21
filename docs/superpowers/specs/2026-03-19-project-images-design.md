# Project Images & Multi-Stakeholder Carousel — Design Spec

**Date:** 2026-03-19
**Status:** Draft

## Context

All three portfolio case studies (b:luz, Juntos, Innoscience) currently render colored placeholder divs instead of real project images. High-quality mockup assets exist in the `references /` directory, named to correspond with their respective case study sections. This change replaces all placeholders with optimized Next.js images and adds an interactive image carousel to the Juntos "Multi-Stakeholder Design" section.

## Scope

1. Copy and organize reference images into `public/projects/`
2. Extend TypeScript interfaces with image URL properties
3. Replace `ImagePlaceholder` with `next/image` throughout
4. Update `ProjectCard` thumbnails with real images
5. Build `ImageCarousel` component for Multi-Stakeholder section

## Image-to-Section Mapping

### b:luz Design System (`bluz`)

| Reference File | Target Section | Public Path |
|----------------|----------------|-------------|
| `design-system-thumb.png` | Card thumbnail + header | `/projects/bluz/thumb.png` |
| `main-problem.png` | Main Problem | `/projects/bluz/main-problem.png` |
| `atomic design.png` | Solution: Atomic Design | `/projects/bluz/atomic-design.png` |
| `comprehensive-design.png` | Solution: Guidelines | `/projects/bluz/comprehensive-design.png` |
| `illustration-system.png` | Solution: Illustration System | `/projects/bluz/illustration-system.png` |
| `results.png` | Results | `/projects/bluz/results.png` |

### Juntos Remote Learning (`juntos`)

| Reference File | Target Section | Public Path |
|----------------|----------------|-------------|
| `juntos-thumb.png` | Card thumbnail + header | `/projects/juntos/thumb.png` |
| `main-problem.png` | Main Problem | `/projects/juntos/main-problem.png` |
| `immersive-virtual.png` | Solution: Immersive Virtual School | `/projects/juntos/immersive-virtual.png` |
| `child-first-visual.png` | Solution: Child-First Visual | `/projects/juntos/child-first-visual.png` |
| `multi-stakeholder1.png` | Solution: Multi-Stakeholder (slide 1) | `/projects/juntos/multi-stakeholder-1.png` |
| `multi-stakeholder2.png` | Solution: Multi-Stakeholder (slide 2) | `/projects/juntos/multi-stakeholder-2.png` |
| `multi-stakeholder3.png` | Solution: Multi-Stakeholder (slide 3) | `/projects/juntos/multi-stakeholder-3.png` |
| `results.png` | Results | `/projects/juntos/results.png` |

### Innoscience Innovation Platform (`innoscience`)

| Reference File | Target Section | Public Path |
|----------------|----------------|-------------|
| `Innoscience.png` | Card thumbnail + header | `/projects/innoscience/thumb.png` |
| `task-manager.png` | Feature Module 01: Task Manager | `/projects/innoscience/task-manager.png` |
| `framework-module.png` | Feature Module 02: Strategic Framework | `/projects/innoscience/framework-module.png` |
| `navegation-menu.png` | Feature Module 03: Navigation Redesign | `/projects/innoscience/navegation-menu.png` |

**Ignored files:** `Gerenciador_de_Tarefas__Layout_de_Dashboards.png`, `Menu_de_Navegao.png` (duplicates)

**Note:** Innoscience has no `main-problem.png` or `results.png` reference images. Those fields are optional in the interface — sections without images keep the existing colored placeholder as fallback.

## Interface Changes

### `Project` interface — add `thumbnailUrl`

`thumbnailUrl` serves as **both** the project card thumbnail and the case study header image (single source of truth).

```typescript
export interface Project {
  id: string;
  name: string;
  year: string;
  tags: string[];
  bgColor: string;
  mockupColor: string;
  thumbnailUrl: string; // NEW — card thumbnail AND case study header
}
```

### `CaseStudyData` interface — add section image URLs

All existing fields (`mainProblem`, `solutions`, `results`, `features`) remain unchanged in shape. Only new optional image URL fields are added.

```typescript
export interface CaseStudyData {
  project: Project;
  description: string;
  role: string;
  client: string;
  website: string;
  mainProblemImageUrl?: string;   // NEW — optional, main problem section
  resultsImageUrl?: string;       // NEW — optional, results section
  mainProblem: {                  // UNCHANGED
    description: string;
    miniProblems: Array<{ title: string; description: string }>;
  };
  solutions: Array<{
    title: string;
    description: string;
    imageUrl?: string;            // NEW — single image for this solution
    imageUrls?: string[];         // NEW — multiple images (carousel)
  }>;
  results: { description: string };
  features?: FeatureModule[];
}
```

**Fallback behavior:** When `mainProblemImageUrl`, `resultsImageUrl`, or solution `imageUrl`/`imageUrls` are undefined, the section renders the existing colored `ImagePlaceholder` div using `project.bgColor`/`project.mockupColor`. This gracefully handles Innoscience (which has no main-problem or results reference images).

### `FeatureModule` interface — add `imageUrl`

```typescript
export interface FeatureModule {
  moduleNumber: number;
  title: string;
  subtitle: string;
  problem: string;
  subFeatures: SubFeature[];
  imageUrl: string;              // NEW — module screenshot
  result: { metric: string; description: string };
}
```

## Component Changes

### `ImagePlaceholder` → `ProjectImage`

Replace the colored-div placeholder with a `next/image` wrapper:

```typescript
function ProjectImage({
  src,
  alt,
  aspect = "aspect-[4/3]",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div className={cn(aspect, "relative w-full overflow-hidden rounded-xl")}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
          priority={priority}
        />
      </div>
    </motion.div>
  );
}
```

**Loading strategy:**
- `priority={true}` on header image (above fold)
- All other images use default lazy loading
- `sizes` attribute for responsive image selection

### `ProjectCard` — use thumbnail

Replace the colored div in `selected-projects.tsx`:

```typescript
<div className="relative aspect-[4/3]">
  <Image
    src={project.thumbnailUrl}
    alt={project.name}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

### `FeatureModuleSection` — use `feature.imageUrl`

Update the `FeatureModuleSection` component in `case-study-content.tsx` to replace its `ImagePlaceholder` with `ProjectImage`:

```typescript
{/* Replace ImagePlaceholder at line ~123 */}
<ProjectImage
  src={feature.imageUrl}
  alt={`${feature.title} screenshot`}
  aspect="aspect-[16/9]"
  sizes="(max-width: 768px) 100vw, 1200px"  // full-width context
/>
```

The `sizes` prop should reflect the full-width layout used by feature modules (unlike the 50vw used in two-column solution sections).

### Solution sections — conditional rendering

For solutions with `imageUrls` (array), render `ImageCarousel`.
For solutions with `imageUrl` (single), render `ProjectImage`.
When neither is present, keep `ImagePlaceholder` as fallback.

### Header and Main Problem sections — conditional image rendering

- **Header:** Use `project.thumbnailUrl` via `ProjectImage` with `priority={true}`
- **Main Problem:** If `data.mainProblemImageUrl` is defined, render `ProjectImage`; otherwise keep `ImagePlaceholder`
- **Results:** If `data.resultsImageUrl` is defined, render `ProjectImage`; otherwise keep `ImagePlaceholder`

## New Component: `ImageCarousel`

**File:** `src/components/ui/image-carousel.tsx`

**Props:**
```typescript
interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspect?: string; // default "aspect-[4/3]"
}
```

**Behavior:**
- Renders one image at a time inside the same aspect-ratio container
- Left/right arrow buttons positioned over the image edges (semi-transparent bg, hover reveals)
- Dot indicators centered below the image
- Loops: clicking right on last image goes to first, left on first goes to last
- Framer Motion `AnimatePresence` for crossfade transition between images
- Arrow keys navigate when component is focused (keyboard accessible)
- Arrows use Lucide `ChevronLeft` / `ChevronRight` icons

**Visual design:**
- Arrow buttons: 40px circles, `bg-background/60 backdrop-blur-sm`, positioned vertically centered on left/right edges with 12px inset
- Hover state: `bg-background/80`
- Dots: 8px circles, active = `bg-foreground`, inactive = `bg-foreground/30`, 8px gap between dots
- Transition: 300ms crossfade with slight horizontal slide (entering from direction of navigation)

## Files Modified

| File | Change |
|------|--------|
| `src/lib/projects.ts` | Add image URL fields to interfaces + all 3 case study data objects |
| `src/components/case-study-content.tsx` | Replace `ImagePlaceholder` with `ProjectImage`, wire up carousel for multi-image solutions |
| `src/components/selected-projects.tsx` | Replace colored div with `next/image` using `thumbnailUrl` |
| `src/components/ui/image-carousel.tsx` | **NEW** — carousel component |

## Files Copied (reference → public)

18 images total from `references /` → `public/projects/` (see mapping table above: 6 bluz + 8 juntos + 4 innoscience).

## Verification

1. `npm run lint && npx tsc --noEmit` — no type errors
2. `npm run build` — successful build with optimized images
3. Visual check: all 3 project cards show thumbnails on `/work`
4. Visual check: each case study page shows correct images in every section
5. Juntos Multi-Stakeholder: arrows cycle through 3 images, dots update, keyboard nav works
6. Responsive: images scale correctly at mobile/tablet/desktop breakpoints
7. Network tab: images lazy-load (except header which has `priority`)
