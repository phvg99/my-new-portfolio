import { BGPattern } from "@/components/ui/bg-pattern";

export function SubpageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BGPattern variant="grid" mask="fade-edges" />
      {children}
    </div>
  );
}
