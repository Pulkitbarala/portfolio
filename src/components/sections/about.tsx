"use client";

import React from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import aboutData from "@/data/about.json";

export function About() {
  return (
    <section
      id="about"
      className="relative py-16 px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      {/* Editorial Border Divider */}
      <div className="editorial-grid-line mb-12 opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column: Heading & Stat Numbers */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold block mb-2">
              01 // BIOGRAPHY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
              About Me
            </h2>
          </div>

          {/* Stats List: Staggered and Typographically Dominated */}
          {aboutData.stats && aboutData.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-4">
              {aboutData.stats.map((stat: { label: string; value: string }, i: number) => (
                <ScrollReveal
                  key={stat.label}
                  delay={100 + i * 100}
                  duration={500}
                  className="flex flex-col border-l border-border/80 pl-4"
                >
                  <span className="text-4xl sm:text-5xl font-bold text-accent tracking-tighter leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-mono tracking-wider mt-2">
                    {stat.label}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Bio Paragraphs */}
        <div className="lg:col-span-7 lg:border-l lg:border-border/60 lg:pl-10 flex flex-col gap-6">
          {aboutData.paragraphs.map((paragraph, index) => {
            // First paragraph is styled as a large editorial intro
            const isFirst = index === 0;
            return (
              <ScrollReveal
                key={index}
                delay={200 + index * 100}
                duration={600}
              >
                <p
                  className={isFirst 
                    ? "text-base sm:text-lg md:text-xl text-foreground font-light leading-relaxed" 
                    : "text-sm sm:text-base text-muted-foreground leading-relaxed font-light"
                  }
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
