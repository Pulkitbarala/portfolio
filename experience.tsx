"use client";

import React from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import experienceData from "@/data/experience.json";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-16 px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      {/* Editorial border line */}
      <div className="editorial-grid-line mb-12 opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* Left Side: Editorial Title */}
        <div className="lg:col-span-4 mb-4 lg:mb-0">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold block mb-2">
            02 // CHRONOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
            Experience
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm font-light mt-4 max-w-xs uppercase leading-relaxed font-mono">
            A history of technical execution, building web platforms, and data workflows.
          </p>
        </div>

        {/* Right Side: Publication List Layout */}
        <div className="lg:col-span-8 flex flex-col w-full">
          {experienceData.map((item, index) => (
            <ScrollReveal
              key={index}
              delay={100 + index * 100}
              duration={500}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-border/60 transition-colors duration-220 text-left"
            >
              {/* Year column */}
              <div className="md:col-span-3 font-mono text-[11px] sm:text-xs tracking-wider text-muted-foreground group-hover:text-accent font-semibold transition-colors duration-220">
                {item.period}
              </div>

              {/* Role & Company column */}
              <div className="md:col-span-4 flex flex-col">
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-foreground/90 transition-colors duration-220 leading-tight">
                  {item.role}
                </h3>
                <span className="text-xs font-mono text-muted-foreground/80 mt-1">
                  {item.company}
                </span>
              </div>

              {/* Description column */}
              <div className="md:col-span-5 text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                {item.description}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Experience;
