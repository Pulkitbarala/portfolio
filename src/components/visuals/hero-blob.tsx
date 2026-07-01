"use client";

import React from "react";
import { motion } from "framer-motion";

const blobPaths = [
  "M45.3,-78.2C59.1,-71.5,71.1,-59.8,79.4,-45.8C87.7,-31.8,92.3,-15.9,91.3,-0.6C90.3,14.7,83.7,29.4,74.6,42.1C65.5,54.8,53.9,65.5,40.3,73.2C26.7,80.9,13.4,85.6,-1.2,87.6C-15.7,89.7,-31.4,89.1,-44.6,82.8C-57.8,76.5,-68.5,64.5,-76.2,50.7C-83.9,36.9,-88.6,21.2,-89.2,5.3C-89.8,-10.6,-86.3,-26.7,-78.3,-40.3C-70.3,-53.9,-57.8,-65,-43.7,-71.4C-29.6,-77.8,-14.8,-79.5,0.8,-80.9C16.4,-82.3,32.8,-83.4,45.3,-78.2Z",
  "M39.5,-67.8C52.9,-61.2,66.9,-54.1,75.2,-42.6C83.5,-31.1,86.2,-15.6,84.7,-0.9C83.2,13.8,77.5,27.6,69.2,39.5C60.9,51.4,50,61.4,37.3,68.5C24.6,75.6,10,79.8,-3.9,79.3C-17.8,78.8,-31,73.6,-43.6,66.4C-56.2,59.2,-68.2,50,-75.8,37.7C-83.4,25.4,-86.6,10,-85.1,-4.6C-83.6,-19.2,-77.4,-33,-68.1,-44.1C-58.8,-55.2,-46.4,-63.6,-33.3,-70.4C-20.2,-77.2,-6.4,-82.4,3.5,-78.2C13.4,-74,26.1,-60.4,39.5,-67.8Z",
  "M43.1,-74.5C56.7,-68.5,69.3,-58.5,77.7,-45.5C86.1,-32.5,90.3,-16.3,89.7,-0.3C89.2,15.6,83.9,31.2,75.2,44.3C66.5,57.4,54.4,68,40.5,74.8C26.6,81.6,10.9,84.6,-3.5,83.3C-17.9,82,-34.4,76.4,-48.2,67.8C-62,59.2,-73.1,47.6,-79.7,33.7C-86.3,19.8,-88.4,3.6,-85.5,-11.2C-82.6,-26,-74.7,-39.4,-64,-50.1C-53.3,-60.8,-39.8,-68.8,-26,-74.5C-12.2,-80.2,1.9,-83.6,15.5,-81.1C29.1,-78.6,42.2,-70.2,43.1,-74.5Z",
];

export function HeroBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Primary morphing blob */}
      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-[0.07] dark:opacity-[0.05]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="blob-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <motion.path
          d={blobPaths[0]}
          fill="url(#blob-gradient-1)"
          transform="translate(100 100)"
          animate={{
            d: blobPaths,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      {/* Secondary smaller blob */}
      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-[0.05] dark:opacity-[0.03]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="blob-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <motion.path
          d={blobPaths[2]}
          fill="url(#blob-gradient-2)"
          transform="translate(100 100)"
          animate={{
            d: [...blobPaths].reverse(),
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      {/* Floating particles */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${15 + i * 15}%`}
            cy={`${20 + (i % 3) * 25}%`}
            r={2 + (i % 3)}
            fill="var(--accent)"
            opacity={0.15}
            animate={{
              y: [0, -30 - i * 5, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
