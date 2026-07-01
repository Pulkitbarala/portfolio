"use client";

import { useEffect, useRef } from "react";

export interface UseSmoothScrollOptions {
  /** Mode of tracking: 'element' tracks intersection/position in viewport, 'page' tracks absolute page-wide scroll progress */
  mode?: "element" | "page";
  /** Viewport ratio at which progress starts (1.0 = bottom of screen) */
  startOffset?: number;
  /** Viewport ratio at which progress completes (0.0 = top of screen) */
  endOffset?: number;
  /** Easing rate (lerp rate) for smoothing scroll progress. Higher is faster, lower is smoother (e.g. 0.06 - 0.12) */
  lerpRate?: number;
  /** Callback fired with the current interpolated progress value */
  onProgress?: (progress: number, revealProgress: number) => void;
}

export function useSmoothScroll<T extends HTMLElement | SVGElement = HTMLDivElement>({
  mode = "element",
  startOffset = 0.95,
  endOffset = 0.2,
  lerpRate = 0.08,
  onProgress
}: UseSmoothScrollOptions = {}) {
  const ref = useRef<T | null>(null);
  const stateRef = useRef({
    currentProgress: 0,
    targetProgress: 0,
    revealProgress: 0,
    absoluteOffsetTop: 0,
    isIntersecting: mode === "page", // Page-wide progress doesn't need viewport intersection
    rafId: null as number | null,
    lastTime: 0
  });

  useEffect(() => {
    const el = ref.current;
    if (!el && mode === "element") return;

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el) {
        el.style.setProperty("--scroll-progress", "1");
        el.style.setProperty("--reveal-progress", "1");
      }
      if (onProgress) onProgress(1, 1);
      return;
    }

    const state = stateRef.current;

    // Cache element offsets to prevent layout thrashing on scroll
    const measureElement = () => {
      if (!el || mode === "page") return;
      let top = 0;
      let currEl: HTMLElement | null = el as HTMLElement;
      while (currEl) {
        top += currEl.offsetTop || 0;
        currEl = currEl.offsetParent as HTMLElement | null;
      }
      state.absoluteOffsetTop = top;
    };

    const calculateTargetProgress = () => {
      if (typeof window === "undefined") return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (mode === "page") {
        const scrollHeight = document.documentElement.scrollHeight - viewportHeight;
        state.targetProgress = scrollHeight > 0 ? Math.max(0, Math.min(1, scrollY / scrollHeight)) : 0;
      } else {
        const rectTop = state.absoluteOffsetTop - scrollY;
        const startDist = viewportHeight * startOffset;
        const endDist = viewportHeight * endOffset;
        const range = startDist - endDist;

        if (range > 0) {
          const progress = (startDist - rectTop) / range;
          state.targetProgress = Math.max(0, Math.min(1, progress));
        } else {
          state.targetProgress = 0;
        }
      }
    };

    // Frame-rate independent exponential interpolation loop
    const updateInterpolation = (timestamp: number) => {
      if (!state.lastTime) state.lastTime = timestamp;
      
      // Calculate delta time in standard 60fps frame equivalents (16.666 ms)
      const deltaTime = (timestamp - state.lastTime) / 16.666;
      state.lastTime = timestamp;

      // Frame-rate independent decay formula
      // current = current + (target - current) * (1 - Math.exp(-lerpRate * dt))
      const rate = 1 - Math.exp(-lerpRate * Math.max(0.1, Math.min(10, deltaTime)));
      const diff = state.targetProgress - state.currentProgress;

      if (Math.abs(diff) < 0.0002) {
        state.currentProgress = state.targetProgress;
      } else {
        state.currentProgress += diff * rate;
      }

      // Update reveal progress (only goes up, stays at max)
      state.revealProgress = Math.max(state.revealProgress, state.currentProgress);

      // Write values directly to DOM style properties (prevents React re-renders)
      if (el) {
        el.style.setProperty("--scroll-progress", state.currentProgress.toFixed(4));
        el.style.setProperty("--reveal-progress", state.revealProgress.toFixed(4));
      }

      if (onProgress) {
        onProgress(state.currentProgress, state.revealProgress);
      }

      // If progress has reached target and we are at rest, stop loop
      if (state.currentProgress === state.targetProgress) {
        state.rafId = null;
        state.lastTime = 0;
      } else {
        state.rafId = requestAnimationFrame(updateInterpolation);
      }
    };

    const triggerUpdate = () => {
      calculateTargetProgress();
      if (state.isIntersecting && state.rafId === null) {
        state.lastTime = 0;
        state.rafId = requestAnimationFrame(updateInterpolation);
      }
    };

    const handleScroll = () => {
      triggerUpdate();
    };

    // Listeners and Observers setup
    let observer: IntersectionObserver | null = null;

    if (mode === "element" && el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          state.isIntersecting = entry.isIntersecting;
          if (state.isIntersecting) {
            measureElement();
            window.addEventListener("scroll", handleScroll, { passive: true });
            triggerUpdate();
          } else {
            window.removeEventListener("scroll", handleScroll);
            if (state.rafId !== null) {
              cancelAnimationFrame(state.rafId);
              state.rafId = null;
            }
          }
        },
        {
          rootMargin: "100px 0px 100px 0px", // Expand threshold slightly to start drawing lines before they enter screen
          threshold: 0
        }
      );
      observer.observe(el);
    } else {
      // Page mode
      window.addEventListener("scroll", handleScroll, { passive: true });
      triggerUpdate();
    }

    // Window size / load updates to prevent layout shift errors
    const handleResize = () => {
      measureElement();
      triggerUpdate();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", handleResize, { passive: true });
    
    // Backup timer to handle post-load layout modifications
    const backupTimer = setTimeout(handleResize, 600);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      clearTimeout(backupTimer);
      if (state.rafId !== null) {
        cancelAnimationFrame(state.rafId);
      }
    };
  }, [mode, startOffset, endOffset, lerpRate]);

  return ref;
}
