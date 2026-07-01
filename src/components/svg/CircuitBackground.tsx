import React from "react";

interface CircuitBackgroundProps {
  className?: string;
  type?: "vertical" | "horizontal";
}

export function CircuitBackground({ className = "", type = "vertical" }: CircuitBackgroundProps) {
  const pathVert1 = "M 10,0 L 10,150 L 15,180 L 15,350 L 5,390 L 5,600 L 12,630 L 12,800";
  const pathVert2 = "M 90,0 L 90,200 L 85,230 L 85,450 L 95,490 L 95,700 L 88,730 L 88,800";
  const pathHoriz = "M 0,50 L 300,50 L 320,70 L 680,70 L 700,30 L 1000,30";

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden ${className}`}>
      {type === "vertical" ? (
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="circuit-vert-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--svg-accent-cyan)">
                <animate attributeName="stop-color" values="var(--svg-accent-cyan);var(--svg-accent-indigo);var(--svg-accent-cyan)" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="var(--svg-accent-indigo)">
                <animate attributeName="stop-color" values="var(--svg-accent-indigo);var(--svg-accent-purple);var(--svg-accent-indigo)" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="var(--svg-accent-purple)">
                <animate attributeName="stop-color" values="var(--svg-accent-purple);var(--svg-accent-cyan);var(--svg-accent-purple)" dur="10s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <filter id="subtle-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
            <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--svg-accent-cyan)" floodOpacity="0.8" />
            </filter>
          </defs>
          
          {/* Layer 1: Blurred Ambient Glow paths */}
          <path
            d={pathVert1}
            fill="none"
            stroke="url(#circuit-vert-grad)"
            strokeWidth="2"
            className="draw-path-scroll-glow"
          />
          <path
            d={pathVert2}
            fill="none"
            stroke="url(#circuit-vert-grad)"
            strokeWidth="2"
            className="draw-path-scroll-glow"
          />
          
          {/* Layer 2: Main crisp paths */}
          <path
            d={pathVert1}
            fill="none"
            stroke="url(#circuit-vert-grad)"
            strokeWidth="0.6"
            className="draw-path-scroll path-breathing"
            style={{ '--base-width': '0.6px' } as React.CSSProperties}
          />
          <path
            d={pathVert2}
            fill="none"
            stroke="url(#circuit-vert-grad)"
            strokeWidth="0.6"
            className="draw-path-scroll path-breathing"
            style={{ '--base-width': '0.6px' } as React.CSSProperties}
          />
          
          {/* Moving highlights */}
          <circle
            r="1.8"
            fill="var(--svg-accent-cyan)"
            filter="url(#node-glow)"
            className="flight-object-scroll"
            style={{ '--flight-path': `path('${pathVert1}')` } as React.CSSProperties}
          />
          <circle
            r="1.8"
            fill="var(--svg-accent-purple)"
            filter="url(#node-glow)"
            className="flight-object-scroll"
            style={{ '--flight-path': `path('${pathVert2}')` } as React.CSSProperties}
          />
          
          {/* Subtle nodes */}
          <g fill="none" strokeWidth="0.3">
            <circle cx="15" cy="180" r="1.5" fill="var(--svg-accent-cyan)" filter="url(#node-glow)" className="glow-scroll" />
            <circle cx="5" cy="390" r="1.5" fill="var(--svg-accent-indigo)" className="glow-scroll" />
            <circle cx="85" cy="230" r="1.5" fill="var(--svg-accent-purple)" filter="url(#node-glow)" className="glow-scroll" />
            <circle cx="95" cy="490" r="1.5" fill="var(--svg-accent-cyan)" className="glow-scroll" />
          </g>
        </svg>
      ) : (
        <svg
          className="w-full h-full opacity-35"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="circuit-horiz-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--svg-accent-blue)">
                <animate attributeName="stop-color" values="var(--svg-accent-blue);var(--svg-accent-cyan);var(--svg-accent-blue)" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="var(--svg-accent-cyan)">
                <animate attributeName="stop-color" values="var(--svg-accent-cyan);var(--svg-accent-purple);var(--svg-accent-cyan)" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="var(--svg-accent-cyan)" floodOpacity="0.85" />
            </filter>
          </defs>
          
          {/* Blurred Glow layer */}
          <path
            d={pathHoriz}
            fill="none"
            stroke="url(#circuit-horiz-grad)"
            strokeWidth="4"
            className="draw-path-scroll-glow"
          />
          
          {/* Main crisp path */}
          <path
            d={pathHoriz}
            fill="none"
            stroke="url(#circuit-horiz-grad)"
            strokeWidth="1.5"
            className="draw-path-scroll path-breathing"
            style={{ '--base-width': '1.5px' } as React.CSSProperties}
          />
          
          {/* Moving highlight */}
          <circle
            r="3.5"
            fill="var(--svg-accent-cyan)"
            filter="url(#node-glow)"
            className="flight-object-scroll"
            style={{ '--flight-path': `path('${pathHoriz}')` } as React.CSSProperties}
          />
          
          <circle cx="320" cy="70" r="3" fill="var(--svg-accent-cyan)" filter="url(#node-glow)" className="glow-scroll" />
          <circle cx="700" cy="30" r="3" fill="var(--svg-accent-blue)" className="glow-scroll" />
        </svg>
      )}
    </div>
  );
}
export default CircuitBackground;
