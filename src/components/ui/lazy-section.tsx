import React, { type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Minimum height placeholder to prevent layout shifts during content-visibility calculation */
  minHeight?: string;
  id?: string;
  className?: string;
}

/**
 * LazySection leverages CSS content-visibility: auto to skip layout, styling,
 * and painting for offscreen sections.
 * This delivers identical performance benefits to JavaScript-based lazy loading
 * while preserving complete SEO indexability and enabling zero-JS fallback.
 */
export function LazySection({
  children,
  minHeight = "400px",
  id,
  className = "",
}: LazySectionProps) {
  return (
    <div
      id={id}
      className={`${className} optimize-rendering w-full`}
      style={{
        containIntrinsicSize: `0 ${minHeight}`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
