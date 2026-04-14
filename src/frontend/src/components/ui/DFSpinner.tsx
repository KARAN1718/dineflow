import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "rounded-full border-border border-t-primary animate-spin",
        sizeMap[size],
        className,
      )}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground font-display">Loading…</p>
      </div>
    </div>
  );
}
