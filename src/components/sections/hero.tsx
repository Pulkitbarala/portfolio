"use client";

import React from "react";
import { ArrowRight, FileText, Mail } from "lucide-react";
import cvData from "@/data/cv.json";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center px-6 pt-12 pb-20 max-w-6xl mx-auto min-h-[90vh] overflow-visible"
    >
      {/* Background Editorial Typography */}
      <div className="absolute right-4 bottom-12 text-[14vw] font-bold text-muted/15 dark:text-muted/5 select-none pointer-events-none uppercase font-display leading-none z-0 tracking-tighter">
        Developer
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10 relative">
        
        {/* Left Column: Typographic Headline & Intro */}
        <div className="lg:col-span-8 flex flex-col justify-center text-left">
          
          <ScrollReveal delay={50} duration={600}>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
              [ Systems Developer & Data Engineer ]
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} duration={700}>
            <h1 className="editorial-title text-foreground mb-8">
              Building<br />
              Digital<br />
              Systems.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={250} duration={600}>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-light mb-8">
              Hello, I&apos;m <span className="text-foreground font-medium">{siteConfig.person.name}</span>. 
              I design and engineer clean frontend systems, robust backends, and practical data science workflows to create high-performance digital experiences.
            </p>
          </ScrollReveal>

          {/* Custom Buttons Group */}
          <ScrollReveal delay={350} duration={600}>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground hover:bg-accent/95 shadow-sm shadow-accent/15 px-6 h-11 transition-editorial group"
              >
                Inquire Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href={cvData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent hover:border-muted-foreground/40 hover:bg-muted/40 text-foreground px-6 h-11 transition-editorial group"
              >
                Download CV
                <FileText className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </a>

              {/* Social Links Row */}
              <div className="flex items-center gap-2.5 ml-2 mt-2 sm:mt-0">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="rounded-lg border border-border bg-transparent hover:border-muted-foreground/30 hover:bg-muted/30 p-2.5 text-muted-foreground hover:text-foreground transition-editorial flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>

                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="rounded-lg border border-border bg-transparent hover:border-muted-foreground/30 hover:bg-muted/30 p-2.5 text-muted-foreground hover:text-foreground transition-editorial flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>

                <a
                  href={`mailto:${siteConfig.person.email}`}
                  aria-label="Email Pulkit"
                  className="rounded-lg border border-border bg-transparent hover:border-muted-foreground/30 hover:bg-muted/30 p-2.5 text-muted-foreground hover:text-foreground transition-editorial flex items-center justify-center"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Asymmetric Image Placement & Status */}
        <div className="lg:col-span-4 flex flex-col gap-8 w-full mt-8 lg:mt-0">
          
          {/* Status / Availability Badge */}
          <ScrollReveal delay={200} duration={600}>
            <div className="border border-border/80 bg-muted/30 p-5 rounded-lg text-left font-mono text-[11px] sm:text-xs leading-normal">
              <div className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                Status: Open to Work
              </div>
              <p className="text-muted-foreground uppercase">
                Available for full-time software engineering roles & selected freelance contracts.
              </p>
              <div className="mt-3 text-foreground/80 uppercase">
                Current Location: Delhi, IN / Remote
              </div>
            </div>
          </ScrollReveal>

          {/* Integrated Portrait Box */}
          <ScrollReveal delay={300} duration={700}>
            <div className="relative group">
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-border bg-muted">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                  alt="Pulkit Barala"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02] filter grayscale hover:grayscale-0"
                />
              </div>
              
              {/* Monospace Figure Caption */}
              <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest px-1">
                <span>[ FIG 01 // PORTRAIT ]</span>
                <span>P. BARALA © 2026</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
