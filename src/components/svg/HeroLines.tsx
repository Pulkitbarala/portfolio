import React from "react";

export function HeroLines() {
  const paths = [
    "M 200,120 L 320,120 L 400,200 L 550,200",
    "M 320,120 L 360,60 L 500,60",
    "M 400,200 L 430,260 L 520,260",
    "M 1240,780 L 1120,780 L 1040,700 L 890,700",
    "M 1120,780 L 1080,840 L 940,840",
    "M 1040,700 L 1010,640 L 920,640"
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#0B1220]/20">
      {/* Background Gradients */}
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hero-glow-1" cx="20%" cy="30%" r="50%" fx="20%" fy="30%">
            <stop offset="0%" stopColor="var(--svg-accent-indigo)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-glow-2" cx="80%" cy="70%" r="60%" fx="80%" fy="70%">
            <stop offset="0%" stopColor="var(--svg-accent-cyan)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          
          {/* Flowing Linear Gradient */}
          <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--svg-accent-blue)">
              <animate attributeName="stop-color" values="var(--svg-accent-blue);var(--svg-accent-purple);var(--svg-accent-cyan);var(--svg-accent-blue)" dur="12s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="var(--svg-accent-indigo)">
              <animate attributeName="stop-color" values="var(--svg-accent-indigo);var(--svg-accent-blue);var(--svg-accent-purple);var(--svg-accent-indigo)" dur="12s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="var(--svg-accent-purple)">
              <animate attributeName="stop-color" values="var(--svg-accent-purple);var(--svg-accent-cyan);var(--svg-accent-blue);var(--svg-accent-purple)" dur="12s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <filter id="subtle-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="var(--svg-accent-cyan)" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Ambient Glows */}
        <rect width="100%" height="100%" fill="url(#hero-glow-1)" />
        <rect width="100%" height="100%" fill="url(#hero-glow-2)" />

        {/* Floating Particles */}
        <circle cx="15%" cy="80%" r="2" fill="var(--svg-accent-blue)" className="particle-fly-1" />
        <circle cx="75%" cy="60%" r="1.5" fill="var(--svg-accent-purple)" className="particle-fly-2" />
        <circle cx="45%" cy="90%" r="2.5" fill="var(--svg-accent-cyan)" className="particle-fly-3" />

        {/* Diagonal Background Grid Accent */}
        <pattern id="diag-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
          <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#diag-grid)" />
      </svg>

      {/* Main Structural SVGs */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagons Grid (scroll scales and pulses) */}
        <g stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1.5" fill="none" className="hexagon-glowing scale-scroll">
          <polygon points="120,60 170,90 170,150 120,180 70,150 70,90" className="path-breathing" style={{ '--base-width': '1.5px' } as React.CSSProperties} />
          <polygon points="170,150 220,180 220,240 170,270 120,240 120,180" />
          <polygon points="1200,600 1250,630 1250,690 1200,720 1150,690 1150,630" className="path-breathing" style={{ '--base-width': '1.5px' } as React.CSSProperties} />
          <polygon points="1250,690 1300,720 1300,780 1250,810 1200,810 1200,750" />
        </g>

        {/* AI Neural Connection Traces (Double-layered scroll draw paths) */}
        <g stroke="url(#circuit-grad)" fill="none">
          {/* Layer 1: Blurred Ambient Glow paths */}
          <g strokeWidth="3" opacity="0.4">
            {paths.map((p, i) => (
              <path key={`glow-${i}`} d={p} className="draw-path-scroll-glow" />
            ))}
          </g>

          {/* Layer 2: Main crisp paths */}
          <g strokeWidth="1.5" opacity="0.6">
            {paths.map((p, i) => (
              <path key={`crisp-${i}`} d={p} className="draw-path-scroll path-breathing" style={{ '--base-width': '1.5px' } as React.CSSProperties} />
            ))}
          </g>
        </g>

        {/* Moving Highlights: Circles traveling along paths */}
        <g fill="none">
          {paths.map((p, i) => (
            <circle
              key={`highlight-${i}`}
              r="4.5"
              fill="var(--svg-accent-cyan)"
              filter="url(#node-glow)"
              className="flight-object-scroll"
              style={{ "--flight-path": `path('${p}')` } as React.CSSProperties}
            />
          ))}
        </g>

        {/* Glowing AI/Neural nodes (sequential glow nodes mapped to scroll) */}
        <g fill="none">
          {/* Left Node Set */}
          <circle cx="200" cy="120" r="5.5" fill="var(--svg-accent-blue)" filter="url(#node-glow)" className="node-scroll-1 pulse-node-dot" />
          <circle cx="320" cy="120" r="4.5" fill="var(--svg-accent-cyan)" className="node-scroll-2" />
          <circle cx="400" cy="200" r="4.5" fill="var(--svg-accent-indigo)" className="node-scroll-3" />
          <circle cx="550" cy="200" r="6.5" fill="var(--svg-accent-purple)" filter="url(#node-glow)" className="node-scroll-4 pulse-node-dot-delayed" />
          <circle cx="500" cy="60" r="3.5" fill="var(--svg-accent-blue)" className="node-scroll-3" />
          <circle cx="520" cy="260" r="3.5" fill="var(--svg-accent-purple)" className="node-scroll-4" />

          {/* Right Node Set */}
          <circle cx="1240" cy="780" r="5.5" fill="var(--svg-accent-cyan)" filter="url(#node-glow)" className="node-scroll-1 pulse-node-dot" />
          <circle cx="1120" cy="780" r="4.5" fill="var(--svg-accent-blue)" className="node-scroll-2" />
          <circle cx="1040" cy="700" r="4.5" fill="var(--svg-accent-indigo)" className="node-scroll-3" />
          <circle cx="890" cy="700" r="6.5" fill="var(--svg-accent-purple)" filter="url(#node-glow)" className="node-scroll-4 pulse-node-dot-delayed" />
          <circle cx="940" cy="840" r="3.5" fill="var(--svg-accent-cyan)" className="node-scroll-3" />
          <circle cx="920" cy="640" r="3.5" fill="var(--svg-accent-blue)" className="node-scroll-4" />
        </g>
      </svg>
    </div>
  );
}
export default HeroLines;
