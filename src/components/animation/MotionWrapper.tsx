"use client";

import React, { useRef, useEffect } from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  type?: "float" | "parallax" | "hover-glow";
  parallaxFactor?: number;
}

export function MotionWrapper({
  children,
  className = "",
  type = "float",
  parallaxFactor = 0.03
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type !== "parallax" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor deviation from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) * parallaxFactor;
      targetY = (e.clientY - centerY) * parallaxFactor;
    };

    const updatePosition = () => {
      const el = ref.current;
      if (!el) return;

      // Smooth interpolation (lerp) for micro-animations
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [type, parallaxFactor]);

  const classes = [
    className,
    type === "float" ? "animate-blob-float" : "",
    type === "hover-glow" ? "transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:border-accent/40" : ""
  ].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
