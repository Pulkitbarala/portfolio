"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const scrollPosition = window.scrollY + 100;
      
      // Check if user has scrolled to the absolute bottom of the page
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;
      
      if (isAtBottom) {
        setActiveSection("Contact");
        return;
      }

      // Otherwise, check sections based on scroll position
      const sections = links.map(link => document.querySelector(link.hash));

      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          if (
            section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
          ) {
            const currentLink = links.find(link => link.hash === `#${section.id}`);
            if (currentLink) setActiveSection(currentLink.name);
          }
        }
      });
    };

    // Set initial active state based on hash or scroll position
    const currentHash = window.location.hash;
    if (currentHash) {
      const link = links.find(l => l.hash === currentHash);
      if (link) {
        setTimeout(() => setActiveSection(link.name), 0);
      }
    } else {
      setTimeout(() => handleScroll(), 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-[999] w-full flex justify-center">
      {/* Desktop Navigation */}
      <motion.div
        className={cn(
          "hidden sm:flex items-center justify-between w-full max-w-5xl px-6 py-4 mt-4 transition-all duration-300 rounded-full",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border border-border/50" : "bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="font-bold text-xl tracking-tighter">
          <span className="text-accent">Dev</span>Folio
        </div>

        <nav>
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.hash} className="relative flex items-center justify-center">
                <a
                  className={cn(
                    "flex w-full items-center justify-center px-4 py-2 transition hover:text-foreground",
                    activeSection === link.name ? "text-foreground" : "text-muted-foreground"
                  )}
                  href={link.hash}
                  onClick={() => setActiveSection(link.name)}
                >
                  {link.name}
                  {link.name === activeSection && (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full bg-muted"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    ></motion.span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </motion.div>

      {/* Mobile Navigation Bar */}
      <motion.div
        className={cn(
          "sm:hidden flex items-center justify-between w-full px-6 py-4 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="font-bold text-xl tracking-tighter">
          <span className="text-accent">Dev</span>Folio
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden absolute top-[72px] left-0 w-full bg-background border-b border-border/50 shadow-lg"
          >
            <ul className="flex flex-col items-center py-4">
              {links.map((link) => (
                <li key={link.hash} className="w-full">
                  <a
                    className={cn(
                      "block w-full text-center py-4 transition hover:bg-muted",
                      activeSection === link.name ? "text-accent font-medium bg-muted/50" : "text-muted-foreground"
                    )}
                    href={link.hash}
                    onClick={() => {
                      setActiveSection(link.name);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
