import React from "react";

interface AnimatedBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  id?: string;
}

export function AnimatedBlob({
  className = "",
  color1 = "var(--svg-accent-indigo)",
  color2 = "var(--svg-accent-purple)",
  id = "blob-grad"
}: AnimatedBlobProps) {
  return (
    <div className={`absolute pointer-events-none -z-10 select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-blob-float opacity-30 dark:opacity-20"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
          <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="25" />
          </filter>
        </defs>
        
        {/* Organic, fluid-like blob path */}
        <path
          fill={`url(#${id})`}
          filter={`url(#${id}-blur)`}
          d="M45.5,-75.8C59.7,-68.8,72.4,-57,80.3,-42.2C88.2,-27.4,91.3,-9.6,88.9,7.5C86.5,24.6,78.5,41,66.8,53.2C55,65.4,39.5,73.4,22.8,77.9C6.2,82.4,-11.6,83.4,-27.9,79.1C-44.1,74.8,-58.8,65.2,-68.8,51.8C-78.7,38.5,-84,21.5,-85.1,4.1C-86.2,-13.2,-83.1,-30.9,-74.1,-45C-65,-59.2,-50,-69.8,-35.1,-76.3C-20.2,-82.8,-5.1,-85.2,10,-83.9C25.1,-82.5,45.5,-75.8,45.5,-75.8Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}
export default AnimatedBlob;
