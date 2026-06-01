"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import skillsData from "@/data/skills.json";

const listVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const skillItemVariants: Variants = {
  initial: (index: number) => ({
    opacity: 0,
    y: 28,
    scale: 0.92,
    rotate: index % 2 === 0 ? -4 : 4,
    filter: "blur(8px)",
  }),
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 16,
      mass: 0.7,
    },
  },
  hover: {
    y: -8,
    scale: 1.06,
    rotate: 1,
    filter: "blur(0px) brightness(1.08)",
    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
};

export function Skills() {
  return (
    <motion.section
      id="skills"
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40 px-4 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeading>My skills</SectionHeading>

      <motion.ul
        variants={listVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap justify-center gap-3 sm:gap-4 text-lg text-foreground"
      >
        {skillsData.map((skill, index) => (
          <motion.li
            key={skill}
            custom={index}
            variants={skillItemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98, y: -2 }}
            className="bg-card/80 backdrop-blur-sm border border-border px-5 py-3 sm:px-6 sm:py-4 rounded-xl shadow-sm hover:border-accent hover:text-accent transition-colors cursor-default"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
