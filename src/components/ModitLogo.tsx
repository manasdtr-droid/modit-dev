import { cn } from "@/lib/utils";

interface ModitLogoProps {
  className?: string;
  variant?: "dark" | "light";
  showWordmark?: boolean;
}

/**
 * MODIT logo — abstract geometric "M" formed by two upward chevrons with a
 * forward-leaning notch that suggests speed/delivery. Single color, app-icon ready.
 */
export function ModitLogo({ className, variant = "dark", showWordmark = true }: ModitLogoProps) {
  const wordColor = variant === "dark" ? "text-foreground" : "text-white";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <ModitMark className="h-8 w-8" />
      {showWordmark && (
        <span
          className={cn(
            "font-display text-[1.35rem] font-bold tracking-[-0.04em] leading-none",
            wordColor,
          )}
        >
          modit
        </span>
      )}
    </div>
  );
}

export function ModitMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="var(--color-secondary)" />
      {/* Two upward chevrons with a forward lean */}
      <path
        d="M9 28 L17 12 L20 18 L23 12 L31 28 L27 28 L21.5 17 L20 20 L18.5 17 L13 28 Z"
        fill="var(--color-primary)"
      />
      {/* Speed notch */}
      <path d="M28 30 L33 30 L31 34 L26 34 Z" fill="var(--color-primary)" opacity="0.85" />
    </svg>
  );
}
