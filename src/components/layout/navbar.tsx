"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

type SectionName = (typeof links)[number]["name"];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionName>(() => {
    if (typeof window === "undefined") {
      return "Home";
    }
    const currentHash = window.location.hash;
    const currentLink = links.find((link) => link.hash === currentHash);
    return currentLink?.name ?? "Home";
  });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigateToHash = useCallback((hash: string, sectionName: SectionName) => {
    const id = hash.replace("#", "");
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    history.replaceState(null, "", hash);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(sectionName);
  }, []);

  useEffect(() => {
    // Hide dock on scroll down, show on scroll up (except near bottom or top)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 20) {
        setIsVisible(false); // scrolling down
      } else if (lastScrollY - currentScrollY > 20) {
        setIsVisible(true); // scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection observer to track active section
    const sections = links
      .map((link) => {
        const section = document.querySelector(link.hash);
        return section instanceof HTMLElement ? section : null;
      })
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
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
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0.1, 0.3, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Top Branding Header */}
      <div className="fixed top-6 left-6 z-[990] flex items-center justify-between pointer-events-none w-[calc(100%-48px)] sm:w-auto">
        <div className="text-xs uppercase tracking-widest font-mono text-foreground/80 font-bold bg-background/50 py-1 px-2 rounded border border-border/20 backdrop-blur-sm sm:backdrop-blur-none sm:bg-transparent sm:border-none">
          PULKIT BARALA <span className="text-accent/80 font-normal ml-2 sm:inline hidden">{"// DEVELOPER PORTFOLIO"}</span>
        </div>
      </div>

      {/* Floating Bottom Navigation Dock */}
      <motion.header
        className="fixed bottom-6 left-1/2 z-[999] -translate-x-1/2 flex justify-center w-full max-w-fit px-4"
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : 80, 
          x: "-50%", 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-card border border-border shadow-[0_6px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.25)] rounded-xl max-w-[92vw] sm:max-w-none">
          <nav aria-label="Floating navigation">
            <ul className="flex items-center gap-0.5 sm:gap-1" role="menubar">
              {links.map((link) => (
                <li key={link.hash} className="relative flex items-center justify-center" role="none">
                  <a
                    className={cn(
                      "relative flex items-center justify-center px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-medium transition-colors z-10",
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
                        layoutId="activeSectionDock"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Integrated Theme Toggle with thin divider */}
          <div className="w-[1px] h-5 bg-border mx-1 sm:mx-2" />
          <ThemeToggle />
        </div>
      </motion.header>
    </>
  );
}
