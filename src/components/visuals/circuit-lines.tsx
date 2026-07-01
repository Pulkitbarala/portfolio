"use client";

import React from "react";
import { motion } from "framer-motion";

const circuitPaths = [
  // Horizontal main line with branches
  "M0 50 H80 V30 H130 V50 H200",
  // Diagonal connector
  "M50 0 V25 L80 50 H120",
  // Bottom branch
  "M150 100 V70 H180 V50",
  // Left vertical with turn
  "M20 100 V60 H60",
  // Right side circuit
  "M180 0 V20 H160 V45",
];

const nodePositions = [
  { cx: 80, cy: 50 },
  { cx: 130, cy: 30 },
  { cx: 200, cy: 50 },
  { cx: 50, cy: 25 },
  { cx: 120, cy: 50 },
  { cx: 180, cy: 50 },
  { cx: 60, cy: 60 },
  { cx: 160, cy: 45 },
];

export function CircuitLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      <svg
        viewBox="0 0 220 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 w-[300px] h-[150px] sm:w-[450px] sm:h-[220px] opacity-[0.06] dark:opacity-[0.04]"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="circuit-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {circuitPaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#circuit-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              pathLength: { duration: 1.5, delay: i * 0.3, ease: "easeInOut" },
              opacity: { duration: 0.5, delay: i * 0.3 },
            }}
          />
        ))}

        {nodePositions.map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r="3"
            fill="var(--accent)"
            filter="url(#circuit-glow)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.8 + i * 0.15,
              type: "spring",
              stiffness: 300,
            }}
          />
        ))}

        {/* Animated pulse traveling along a path */}
        <motion.circle
          r="2"
          fill="var(--accent)"
          filter="url(#circuit-glow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{
            duration: 3,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M0 50 H80 V30 H130 V50 H200"
            begin="2s"
          />
        </motion.circle>
      </svg>

      {/* Bottom-left circuit mirror */}
      <svg
        viewBox="0 0 220 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-[250px] h-[130px] sm:w-[350px] sm:h-[180px] opacity-[0.04] dark:opacity-[0.03] rotate-180"
        preserveAspectRatio="none"
      >
        {circuitPaths.slice(0, 3).map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              pathLength: { duration: 1.5, delay: 1 + i * 0.3, ease: "easeInOut" },
              opacity: { duration: 0.5, delay: 1 + i * 0.3 },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
