"use client";

import React from "react";
import { motion } from "framer-motion";

const drawTransition = {
  duration: 2,
  ease: "easeInOut" as const,
};

export function AnimatedCodeBrackets() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Left angle bracket < */}
      <motion.svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[15%] left-[5%] w-16 h-20 sm:w-24 sm:h-32 opacity-[0.12] dark:opacity-[0.08]"
        aria-hidden="true"
      >
        <motion.path
          d="M90 20L30 80L90 140"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 0.5 }}
        />
      </motion.svg>

      {/* Right angle bracket > */}
      <motion.svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[15%] right-[5%] w-16 h-20 sm:w-24 sm:h-32 opacity-[0.12] dark:opacity-[0.08]"
        aria-hidden="true"
      >
        <motion.path
          d="M30 20L90 80L30 140"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 0.8 }}
        />
      </motion.svg>

      {/* Forward slash / (between brackets) */}
      <motion.svg
        viewBox="0 0 60 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[20%] right-[12%] w-8 h-20 sm:w-12 sm:h-28 opacity-[0.1] dark:opacity-[0.06]"
        aria-hidden="true"
      >
        <motion.path
          d="M45 20L15 140"
          stroke="#8b5cf6"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 1.2 }}
        />
      </motion.svg>

      {/* Curly brace { */}
      <motion.svg
        viewBox="0 0 80 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[15%] left-[8%] w-10 h-24 sm:w-14 sm:h-32 opacity-[0.1] dark:opacity-[0.06]"
        aria-hidden="true"
      >
        <motion.path
          d="M55 10C55 10 35 10 35 30L35 75C35 85 20 90 15 95C20 100 35 105 35 115L35 170C35 190 55 190 55 190"
          stroke="#ec4899"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 1.5 }}
        />
      </motion.svg>

      {/* Semicolon ; */}
      <motion.svg
        viewBox="0 0 40 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[60%] right-[8%] w-6 h-10 sm:w-8 sm:h-14 opacity-[0.1] dark:opacity-[0.06]"
        aria-hidden="true"
      >
        <motion.circle
          cx="20"
          cy="20"
          r="6"
          fill="#06b6d4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        />
        <motion.path
          d="M20 40C20 40 20 55 14 65"
          stroke="#06b6d4"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 2.2 }}
        />
      </motion.svg>

      {/* Hash # symbol */}
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[40%] left-[3%] w-10 h-10 sm:w-14 sm:h-14 opacity-[0.08] dark:opacity-[0.05]"
        aria-hidden="true"
      >
        <motion.path
          d="M30 15L25 85M70 15L65 85M15 35H85M15 65H85"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 1.8 }}
        />
      </motion.svg>
    </div>
  );
}
