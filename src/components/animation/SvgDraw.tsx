"use client";

import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";

interface SvgDrawProps {
  children: React.ReactNode;
  className?: string;
  startOffset?: number;
  endOffset?: number;
  viewBox?: string;
}

export function SvgDraw({
  children,
  className = "",
  startOffset = 0.95,
  endOffset = 0.2,
  viewBox
}: SvgDrawProps) {
  const [initialized, setInitialized] = useState(false);
  const ref = useSmoothScroll<SVGSVGElement>({
    mode: "element",
    startOffset,
    endOffset
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Measure path lengths on the client for correct offset sizing
    const paths = el.querySelectorAll(".draw-path-scroll");
    paths.forEach((path) => {
      const p = path as SVGPathElement;
      try {
        const length = p.getTotalLength();
        p.style.setProperty("--path-length", `${Math.ceil(length)}`);
      } catch (err) {
        console.warn("Failed to get SVG path length:", err);
      }
    });

    setInitialized(true);
  }, [ref]);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={`${className} svg-draw-container ${initialized ? "is-initialized" : ""}`}
    >
      {children}
    </svg>
  );
}

export default SvgDraw;
