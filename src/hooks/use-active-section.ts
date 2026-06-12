import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

/**
 * Scrollspy for the one-page nav. Watches the in-page section anchors and
 * returns the href of the section currently crossing the viewport's middle
 * band. Falls back to the first href (Home / hero region) when no section is
 * past center.
 *
 * `sections` maps a DOM element id to the nav href it corresponds to, ordered
 * top-to-bottom. The first entry is treated as the default (top of page).
 *
 * Returns a `[activeHref, setActiveHref]` tuple — the setter lets callers
 * snap the active link instantly on click while the observer keeps it in
 * sync as the smooth-scroll settles.
 */
export function useActiveSection(
  sections: { id: string; href: string }[]
): [string, Dispatch<SetStateAction<string>>] {
  const [activeHref, setActiveHref] = useState(sections[0]?.href ?? "/");

  useEffect(() => {
    const entriesById = new Map<string, boolean>();

    const resolveActive = () => {
      // Pick the lowest section (bottom-most in source order) whose center
      // band is intersecting; otherwise default to the top section.
      let next = sections[0]?.href ?? "/";
      for (const section of sections) {
        if (entriesById.get(section.id)) next = section.href;
      }
      setActiveHref(next);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entriesById.set(entry.target.id, entry.isIntersecting);
        }
        resolveActive();
      },
      // Thin band across the viewport's vertical center.
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // sections is a stable module-level constant from the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [activeHref, setActiveHref];
}
