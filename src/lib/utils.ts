import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Prefixes a local asset path (e.g. "/projects/bluz/thumb.png") with the
 * deployment basePath so it resolves under GitHub Pages project sites.
 * Next.js does not auto-apply basePath to `next/image` src when images are
 * `unoptimized`, nor to raw <a href> asset links, so we prefix explicitly.
 * Absolute URLs are returned unchanged.
 */
export function assetPath(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}
