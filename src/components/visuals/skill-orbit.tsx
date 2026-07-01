"use client";

import React from "react";
import { motion } from "framer-motion";

const orbitSizes = [
  { r: 120, duration: 30, dotCount: 3, strokeDash: "4 8" },
  { r: 200, duration: 45, dotCount: 4, strokeDash: "6 12" },
  { r: 280, duration: 60, dotCount: 5, strokeDash: "3 15" },
];

export function SkillOrbit() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <svg
        viewBox="-350 -350 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[700px] max-h-[700px] opacity-[0.08] dark:opacity-[0.05]"
      >
        <defs>
          <filter id="orbit-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center dot */}
        <motion.circle
          cx="0"
          cy="0"
          r="4"
          fill="var(--accent)"
          filter="url(#orbit-glow)"
          animate={{
            opacity: [0.5, 1, 0.5],
            r: [4, 6, 4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {orbitSizes.map((orbit, orbitIndex) => (
          <g key={orbitIndex}>
            {/* Orbit ring path */}
            <motion.circle
              cx="0"
              cy="0"
              r={orbit.r}
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray={orbit.strokeDash}
              fill="none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: orbitIndex * 0.3,
              }}
            />

            {/* Orbiting dots */}
            {[...Array(orbit.dotCount)].map((_, dotIndex) => {
              const startAngle = (360 / orbit.dotCount) * dotIndex;
              return (
                <motion.circle
                  key={dotIndex}
                  cx="0"
                  cy={-orbit.r}
                  r={3 + orbitIndex}
                  fill="var(--accent)"
                  filter="url(#orbit-glow)"
                  initial={{
                    rotate: startAngle,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: startAngle + 360,
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    rotate: {
                      duration: orbit.duration,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    opacity: {
                      duration: orbit.duration / orbit.dotCount,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  style={{ originX: "0px", originY: "0px" }}
                />
              );
            })}
          </g>
        ))}

        {/* Connecting lines from center to first orbit */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 120}
            y2={Math.sin((angle * Math.PI) / 180) * 120}
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
