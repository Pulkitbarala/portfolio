"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import aboutData from "@/data/about.json";

export function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      viewport={{ once: true }}
      className="mb-28 max-w-[45rem] mx-auto text-center leading-8 sm:mb-40 scroll-mt-28 px-4"
    >
      <SectionHeading>About me</SectionHeading>

      <Card className="text-left p-8 sm:p-10 text-lg">
        {aboutData.paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-3 last:mb-0" dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </Card>
    </motion.section>
  );
}
