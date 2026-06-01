"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import servicesData from "@/data/service.json";
import { Card } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 mb-28 sm:mb-40 px-4 max-w-5xl mx-auto">
      <SectionHeading subtitle="What I can do for you and your business.">Services</SectionHeading>

      <div className="grid sm:grid-cols-2 gap-6">
        {servicesData.map((service, index) => {
          const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col items-center text-center p-8 group hover:border-accent/50 transition-colors">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
