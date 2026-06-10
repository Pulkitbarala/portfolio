"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import testimonialsData from "@/data/testimonials.json";
import Image from "next/image";
import { Quote } from "lucide-react";

type TestimonialProps = {
  name: string;
  role: string;
  text: string;
  avatarUrl: string;
};

function TestimonialCard({ name, role, text, avatarUrl }: TestimonialProps) {
  return (
    <Card className="h-full flex flex-col justify-between relative overflow-hidden group">
      {/* Decorative quotes icon in background */}
      <Quote className="absolute right-4 top-4 h-24 w-24 text-accent/5 -rotate-12 select-none pointer-events-none group-hover:text-accent/10 transition-colors duration-300" />
      
      <div className="relative z-10 flex-grow flex flex-col">
        <p className="text-muted-foreground italic leading-relaxed text-base sm:text-lg mb-6">
          &ldquo;{text}&rdquo;
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-4 mt-auto border-t border-border/50 pt-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border bg-muted">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            sizes="48px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm sm:text-base leading-tight">
            {name}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {role}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-28 mb-28 px-4 max-w-5xl mx-auto w-full">
      <SectionHeading subtitle="What clients and collaborators say about working with me.">
        Client Testimonials
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <TestimonialCard {...testimonial} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
