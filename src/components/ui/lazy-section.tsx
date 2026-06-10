"use client";

import React, { useRef, useEffect, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** How many pixels before the section enters the viewport should it start loading */
  rootMargin?: string;
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string;
  /** Unique id for the section wrapper */
  id?: string;
  className?: string;
}

/**
 * Wraps a section and only mounts its children when the placeholder
 * scrolls within `rootMargin` of the viewport. This eliminates
 * off-screen rendering and dramatically reduces initial paint work.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  minHeight = "400px",
  id,
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} id={id} className={className}>
      {isVisible ? (
        children
      ) : (
        <div style={{ minHeight }} aria-hidden="true" />
      )}
    </div>
  );
}
