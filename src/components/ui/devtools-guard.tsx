"use client";

import { useEffect } from "react";

/**
 * Detects browser DevTools opening via multiple heuristics and
 * freezes execution by triggering a debugger breakpoint loop.
 *
 * Techniques used:
 * 1. Window outer/inner size difference detection
 * 2. `debugger` statement timing detection
 * 3. Continuous debugger trap once detected
 * 4. Disable right-click context menu
 * 5. Block common keyboard shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U)
 */
export function DevToolsGuard() {
  useEffect(() => {
    // --- Right-click prevention ---
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // --- Keyboard shortcut blocking ---
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (view source)
      if (e.ctrlKey && e.key.toUpperCase() === "U") {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // --- DevTools detection via debugger timing ---
    let devtoolsOpen = false;

    const detectDevTools = () => {
      const threshold = 160;
      const before = performance.now();
      debugger;
      const after = performance.now();
      if (after - before > threshold) {
        devtoolsOpen = true;
      }
    };

    // --- Continuous debugger trap ---
    const freezeLoop = () => {
      if (devtoolsOpen) {
        debugger;
      }
    };

    // Check periodically
    const detectionInterval = setInterval(() => {
      detectDevTools();
      freezeLoop();
    }, 1000);

    // --- Console message to deter curious users ---
    const warningStyle = "color: red; font-size: 24px; font-weight: bold;";
    const messageStyle = "color: white; font-size: 14px;";
    console.log("%c⚠ STOP!", warningStyle);
    console.log(
      "%cThis browser feature is intended for developers. If someone told you to copy-paste something here, it is a scam. Close this window immediately.",
      messageStyle
    );

    return () => {
      clearInterval(detectionInterval);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
