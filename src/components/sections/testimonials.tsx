"use client";

import React from "react";
import testimonialsData from "@/data/testimonials.json";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function Testimonials() {
  return (
    <section 
      id="testimonials" 
      className="relative py-16 px-6 max-w-6xl mx-auto"
    >
      {/* Editorial horizontal grid line */}
      <div className="editorial-grid-line mb-12 opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* Left Column: Heading Info */}
        <div className="lg:col-span-4 mb-6 lg:mb-0">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold block mb-2">
            06 // REPUTATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
            Feedback
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm font-light mt-4 max-w-xs uppercase leading-relaxed font-mono">
            Client testimonials from project integrations and software applications.
          </p>
        </div>

        {/* Right Column: Editorial Quote Sheets */}
        <div className="lg:col-span-8 flex flex-col gap-12 w-full">
          {testimonialsData.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              delay={index * 150}
              duration={600}
              className="flex flex-col border-b border-border/60 pb-8 last:border-none last:pb-0"
            >
              {/* Massive italic quote block */}
              <blockquote className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-foreground/90 font-serif">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              
              {/* Metadata block in monospace */}
              <div className="mt-4 flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
                <span className="text-accent font-bold">—</span>
                <span className="text-foreground font-semibold">{testimonial.name}</span>
                <span className="text-border">/</span>
                <span>{testimonial.role}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
