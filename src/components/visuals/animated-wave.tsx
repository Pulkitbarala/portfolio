"use client";

import React from "react";

export function AnimatedWave() {
  return (
    <div className="relative w-full overflow-hidden leading-[0] -mt-1" aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="relative block w-[200%] h-[60px] sm:h-[80px] md:h-[100px] animate-wave"
      >
        <path
          d="M0,60 C120,100 240,20 360,60 C480,100 600,20 720,60 C840,100 960,20 1080,60 C1200,100 1320,20 1440,60 C1560,100 1680,20 1800,60 C1920,100 2040,20 2160,60 C2280,100 2400,20 2520,60 C2640,100 2760,20 2880,60 L2880,120 L0,120 Z"
          className="fill-background/50 dark:fill-background/30"
        />
        <path
          d="M0,80 C160,110 320,50 480,80 C640,110 800,50 960,80 C1120,110 1280,50 1440,80 C1600,110 1760,50 1920,80 C2080,110 2240,50 2400,80 C2560,110 2720,50 2880,80 L2880,120 L0,120 Z"
          className="fill-background/80 dark:fill-background/60"
        />
        <path
          d="M0,95 C180,115 360,75 540,95 C720,115 900,75 1080,95 C1260,115 1440,75 1620,95 C1800,115 1980,75 2160,95 C2340,115 2520,75 2700,95 C2880,115 2880,95 2880,95 L2880,120 L0,120 Z"
          className="fill-background"
        />
      </svg>
    </div>
  );
}
