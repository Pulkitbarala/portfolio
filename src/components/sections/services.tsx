"use client";

import React from "react";
import servicesData from "@/data/service.json";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import * as LucideIcons from "lucide-react";

export function Services() {
  return (
    <section 
      id="services" 
      className="relative py-16 px-6 max-w-6xl mx-auto"
    >
      {/* Editorial horizontal grid line */}
      <div className="editorial-grid-line mb-12 opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* Left Side: Category Title & Subtext */}
        <div className="lg:col-span-4 mb-6 lg:mb-0">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold block mb-2">
            05 // SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
            Capabilities
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm font-light mt-4 max-w-xs uppercase leading-relaxed font-mono">
            Key areas of expertise and engineering services that help build digital products.
          </p>
        </div>

        {/* Right Side: Capabilities Vertical Index */}
        <div className="lg:col-span-8 flex flex-col w-full">
          {servicesData.map((service, index) => {
            const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number | string; className?: string }>>)[service.icon] || LucideIcons.HelpCircle;

            return (
              <ScrollReveal
                key={index}
                delay={index * 100}
                duration={500}
                className="group flex gap-6 py-6 border-b border-border/60 last:border-none text-left"
              >
                {/* Minimal Icon, no pulsing backgrounds */}
                <div className="flex-shrink-0 text-muted-foreground group-hover:text-accent transition-colors duration-200 mt-1">
                  <IconComponent size={22} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
                
                {/* Details */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-foreground/95 transition-colors duration-200 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Services;
