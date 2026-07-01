import React from "react";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  return (
    <div className={`flex flex-col items-center gap-2 text-muted-foreground ${className}`}>
      <span className="text-xs tracking-[0.2em] uppercase font-semibold text-muted-foreground/60 select-none">
        Scroll
      </span>
      <svg
        width="24"
        height="40"
        viewBox="0 0 24 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-70 hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        {/* Mouse outline */}
        <rect
          x="1"
          y="1"
          width="22"
          height="38"
          rx="11"
          stroke="currentColor"
          strokeWidth="2"
          className="stroke-muted-foreground/40"
        />
        {/* Animated wheel dot */}
        <circle
          cx="12"
          y="0"
          r="2.5"
          fill="var(--svg-accent-cyan)"
          className="scroll-wheel-dot"
          style={{ transformOrigin: "12px 10px" }}
        />
      </svg>
    </div>
  );
}
