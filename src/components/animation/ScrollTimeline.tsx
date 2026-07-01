"use client";

import React from "react";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";

interface ScrollTimelineProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Section top relative to viewport height to start animation (1.0 = bottom of viewport) */
  startOffset?: number;
  /** Section top relative to viewport height to complete animation (0.0 = top of viewport) */
  endOffset?: number;
}

export function ScrollTimeline({
  children,
  className = "",
  id,
  startOffset = 1.0,
  endOffset = 0.15
}: ScrollTimelineProps) {
  const ref = useSmoothScroll<HTMLDivElement>({
    mode: "element",
    startOffset,
    endOffset
  });

  return (
    <div ref={ref} id={id} className={`relative w-full ${className}`}>
      {children}
    </div>
  );
}

export default ScrollTimeline;
