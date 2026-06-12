export function SubpageLayout({ children }: { children: React.ReactNode }) {
  // The blueprint grid lives on <body> globally, so the page is just a
  // min-height wrapper now.
  return <div className="relative min-h-screen">{children}</div>;
}
