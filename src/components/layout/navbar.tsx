"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { links } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

type SectionName = (typeof links)[number]["name"];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionName>("Home");
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync ref with state to keep useEffect dependency-free
  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  const navigateToHash = useCallback((hash: string, sectionName: SectionName) => {
    const id = hash.replace("#", "");
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    // Set programmatic scroll lock
    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set active section immediately on user click
    setActiveSection(sectionName);
    history.replaceState(null, "", hash);

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Release scroll lock after smooth scroll animation completes (~800ms)
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 850);

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    // Synchronize initial active section based on URL hash
    let syncTimer: any = null;
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";
    const currentLink = links.find((link) => link.hash === currentHash);

    if (currentLink) {
      syncTimer = window.setTimeout(() => {
        setActiveSection(currentLink.name);
      }, 0);
    }

    // Scroll listener to toggle navbar visibility (hide on scroll down, show on scroll up)
    const handleScroll = () => {
      // If mobile menu is open, don't trigger scroll hide/show to keep overlay stable
      if (isMobileMenuOpenRef.current) return;

      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 15) {
        setIsVisible(false); // scrolling down
      } else if (lastScrollY - currentScrollY > 15) {
        setIsVisible(true); // scrolling up
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection observer to track active section dynamically during scrolling
    const sections = links
      .map((link) => {
        const section = document.querySelector(link.hash);
        return section instanceof HTMLElement ? section : null;
      })
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updating active section if we are scrolling programmatically
        if (isProgrammaticScrollRef.current) return;

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const topVisible = visibleEntries[0].target as HTMLElement;
        const currentLink = links.find((link) => link.hash === `#${topVisible.id}`);
        if (currentLink) {
          setActiveSection(currentLink.name);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px", // focus on middle-top of the screen
        threshold: [0.1, 0.2, 0.3],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      if (syncTimer !== null) {
        window.clearTimeout(syncTimer);
      }
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run EXACTLY ONCE on mount

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Header Bar */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[999] h-16 border-b border-border/40 transition-transform duration-300 ease-in-out bg-background/80 backdrop-blur-md",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo / Branding */}
          <div className="font-mono text-xs uppercase tracking-widest text-foreground font-bold flex items-center gap-2">
            PULKIT BARALA 
            <span className="text-accent/80 font-normal hidden sm:inline">{"// DEVELOPER PORTFOLIO"}</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4" aria-label="Desktop navigation">
            <ul className="flex items-center gap-1" role="menubar">
              {links.map((link) => (
                <li key={link.hash} className="relative flex items-center justify-center" role="none">
                  <a
                    className={cn(
                      "relative px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors z-10",
                      activeSection === link.name 
                        ? "text-accent font-bold" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    href={link.hash}
                    role="menuitem"
                    aria-current={activeSection === link.name ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToHash(link.hash, link.name);
                    }}
                  >
                    {link.name}
                    {link.name === activeSection && (
                      <motion.span
                        className="absolute inset-0 -z-10 rounded-md bg-muted border border-border/40"
                        layoutId="activeSectionTop"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Integrated Theme Toggle with thin divider */}
            <div className="w-[1px] h-5 bg-border/60 mx-2" />
            <ThemeToggle />
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors border border-border/10 bg-muted/20"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Full Screen Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 pt-16 bg-background/98 backdrop-blur-xl z-[990] flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="w-full max-w-sm mx-auto" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-6" role="menubar">
                {links.map((link, idx) => (
                  <motion.li
                    key={link.hash}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                    role="none"
                  >
                    <a
                      className={cn(
                        "flex items-center justify-between py-2 border-b border-border/20 text-left font-display text-2xl font-bold uppercase tracking-wide transition-all",
                        activeSection === link.name 
                          ? "text-accent border-accent/30 pl-2" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      href={link.hash}
                      role="menuitem"
                      onClick={(event) => {
                        event.preventDefault();
                        navigateToHash(link.hash, link.name);
                      }}
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-xs text-muted-foreground/60 font-medium">
                          {String(idx + 1).padStart(2, "0")} //
                        </span>
                        {link.name}
                      </span>
                      {activeSection === link.name && (
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
