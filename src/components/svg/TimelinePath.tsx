import React from "react";

interface TimelinePathProps {
  className?: string;
  height?: number | string;
}

export function TimelinePath({ className = "", height = 300 }: TimelinePathProps) {
  const pathD = "M 8,0 L 8,400";

  return (
    <div className={`absolute left-0 top-0 h-full w-8 pointer-events-none -translate-x-1/2 flex items-center justify-center ${className}`}>
      <svg
        width="16"
        height="100%"
        viewBox="0 0 16 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full opacity-50"
      >
        <defs>
          <linearGradient id="timeline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--svg-accent-cyan)">
              <animate attributeName="stop-color" values="var(--svg-accent-cyan);var(--svg-accent-indigo);var(--svg-accent-cyan)" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="var(--svg-accent-indigo)">
              <animate attributeName="stop-color" values="var(--svg-accent-indigo);var(--svg-accent-purple);var(--svg-accent-indigo)" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="var(--svg-accent-purple)">
              <animate attributeName="stop-color" values="var(--svg-accent-purple);var(--svg-accent-cyan);var(--svg-accent-purple)" dur="8s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          <filter id="subtle-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="var(--svg-accent-cyan)" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Ambient glow blurred path layer */}
        <path
          d={pathD}
          stroke="url(#timeline-grad)"
          strokeWidth="5"
          className="draw-path-scroll-glow"
        />

        {/* Main crisp tracking path line */}
        <path
          d={pathD}
          stroke="url(#timeline-grad)"
          strokeWidth="2.5"
          className="draw-path-scroll path-breathing"
          style={{ '--base-width': '2.5px' } as React.CSSProperties}
        />

        {/* Moving highlight dot */}
        <circle
          r="4.5"
          fill="var(--svg-accent-cyan)"
          filter="url(#node-glow)"
          className="flight-object-scroll"
          style={{ '--flight-path': `path('${pathD}')` } as React.CSSProperties}
        />

        {/* Nodes along the path */}
        <circle cx="8" cy="80" r="5" fill="var(--svg-accent-cyan)" filter="url(#node-glow)" className="glow-scroll" />
        <circle cx="8" cy="200" r="5" fill="var(--svg-accent-indigo)" className="glow-scroll" />
        <circle cx="8" cy="320" r="5" fill="var(--svg-accent-purple)" filter="url(#node-glow)" className="glow-scroll" />
        
        {/* Soft pulse halos */}
        <circle cx="8" cy="80" r="9" stroke="var(--svg-accent-cyan)" strokeWidth="0.5" strokeDasharray="2 2" className="glow-scroll pulse-node-dot" />
        <circle cx="8" cy="200" r="9" stroke="var(--svg-accent-indigo)" strokeWidth="0.5" strokeDasharray="2 2" className="glow-scroll" />
        <circle cx="8" cy="320" r="9" stroke="var(--svg-accent-purple)" strokeWidth="0.5" strokeDasharray="2 2" className="glow-scroll pulse-node-dot-delayed" />
      </svg>
    </div>
  );
}

export default TimelinePath;
