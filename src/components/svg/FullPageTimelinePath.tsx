"use client";

import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";

export function FullPageTimelinePath() {
  const [initialized, setInitialized] = useState(false);
  const ref = useSmoothScroll<SVGSVGElement>({
    mode: "page",
    lerpRate: 0.05 // Extra damping for smooth page scroll
  });

  const pathD = `M 50,0 
                 L 50,110 
                 L 20,120 
                 L 20,240 
                 L 80,255 
                 L 80,390 
                 L 30,410 
                 L 30,530 
                 L 70,550 
                 L 70,700 
                 L 40,720 
                 L 40,860 
                 L 50,880 
                 L 50,1000`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Measure the path lengths on the client
    const paths = el.querySelectorAll(".draw-path-scroll, .draw-path-scroll-glow");
    paths.forEach((path) => {
      const p = path as SVGPathElement;
      try {
        const length = p.getTotalLength();
        p.style.setProperty("--path-length", `${Math.ceil(length)}`);
      } catch (err) {
        console.warn("Failed to get FullPageTimelinePath length:", err);
      }
    });

    setInitialized(true);
  }, [ref]);

  return (
    <svg
      ref={ref}
      className={`absolute left-2 sm:left-8 lg:left-16 top-0 w-8 h-full pointer-events-none -z-20 select-none overflow-visible transition-opacity duration-700 ${initialized ? "opacity-35 is-initialized" : "opacity-0"}`}
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Color flow gradient */}
        <linearGradient id="full-page-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--svg-accent-cyan)">
            <animate attributeName="stop-color" values="var(--svg-accent-cyan);var(--svg-accent-blue);var(--svg-accent-cyan)" dur="15s" repeatCount="indefinite" />
          </stop>
          <stop offset="33%" stopColor="var(--svg-accent-blue)">
            <animate attributeName="stop-color" values="var(--svg-accent-blue);var(--svg-accent-indigo);var(--svg-accent-blue)" dur="15s" repeatCount="indefinite" />
          </stop>
          <stop offset="66%" stopColor="var(--svg-accent-indigo)">
            <animate attributeName="stop-color" values="var(--svg-accent-indigo);var(--svg-accent-purple);var(--svg-accent-indigo)" dur="15s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="var(--svg-accent-purple)">
            <animate attributeName="stop-color" values="var(--svg-accent-purple);var(--svg-accent-cyan);var(--svg-accent-purple)" dur="15s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        <filter id="subtle-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="var(--svg-accent-cyan)" floodOpacity="0.85" />
        </filter>
      </defs>

      {/* Layer 1: Vertical winding path glow layer */}
      <path
        d={pathD}
        stroke="url(#full-page-grad)"
        strokeWidth="5"
        className="draw-path-scroll-glow"
      />

      {/* Layer 2: Main crisp winding path line */}
      <path
        d={pathD}
        stroke="url(#full-page-grad)"
        strokeWidth="2"
        className="draw-path-scroll path-breathing"
        style={{ '--base-width': '2px' } as React.CSSProperties}
      />

      {/* Moving highlight dot */}
      <circle
        r="4.5"
        fill="var(--svg-accent-cyan)"
        filter="url(#node-glow)"
        className="flight-object-scroll"
        style={{ '--flight-path': `path('${pathD.replace(/\s+/g, ' ')}')` } as React.CSSProperties}
      />

      {/* Glowing nodes at intersections */}
      <g className="glow-scroll">
        <circle cx="50" cy="110" r="3.5" fill="var(--svg-accent-cyan)" filter="url(#node-glow)" />
        <circle cx="20" cy="240" r="3.5" fill="var(--svg-accent-blue)" />
        <circle cx="80" cy="390" r="3.5" fill="var(--svg-accent-indigo)" filter="url(#node-glow)" />
        <circle cx="30" cy="530" r="3.5" fill="var(--svg-accent-purple)" />
        <circle cx="70" cy="700" r="3.5" fill="var(--svg-accent-cyan)" filter="url(#node-glow)" />
        <circle cx="40" cy="860" r="3.5" fill="var(--svg-accent-blue)" />
      </g>
    </svg>
  );
}

export default FullPageTimelinePath;
