import React from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  subtitle?: string;
}

export function SectionHeading({ children, subtitle, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center mb-16", className)}>
      <ScrollReveal delay={50} duration={500}>
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          {...props}
        >
          {children}
        </h2>
      </ScrollReveal>
      
      {subtitle && (
        <ScrollReveal delay={150} duration={500}>
          <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      
      <ScrollReveal delay={250} duration={400}>
        <div className="mt-6 h-1 w-20 rounded-full bg-accent" />
      </ScrollReveal>
    </div>
  );
}
