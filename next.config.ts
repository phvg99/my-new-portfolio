import type { NextConfig } from "next";

// basePath is only needed when the site is served from a subpath (GitHub Pages
// at /my-new-portfolio). The Actions workflow sets PAGES_BASE_PATH; everywhere
// else (Vercel custom domain, local dev) it stays empty so the site serves at root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
