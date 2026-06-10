"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download, Code, Mail, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import cvData from "@/data/cv.json";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section id="home" className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-28 max-w-5xl mx-auto sm:pt-36 min-h-[90vh]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center z-10"
      >
        <motion.div variants={itemVariants} className="relative mb-10">
          {/* Animated pulsing glow behind the image */}
          <motion.div 
            className="absolute -inset-4 bg-accent/30 dark:bg-accent/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Levitating profile image container */}
          <motion.div 
            className="relative h-48 w-48 sm:h-64 sm:w-64 rounded-full overflow-hidden border-[6px] border-background shadow-2xl mx-auto group"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
              alt={`${siteConfig.person.name} portrait`}
              fill
              priority
              sizes="(max-width: 640px) 192px, 256px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          {/* Waving emoji */}
          <motion.span
            className="absolute bottom-6 sm:bottom-10 -right-4 sm:-right-6 text-6xl drop-shadow-md z-10"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
            transition={{
              type: "tween",
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            👋
          </motion.span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-8 text-4xl font-semibold sm:text-6xl md:text-7xl leading-[1.2] md:leading-[1.2] max-w-4xl"
        >
          <motion.span 
            className="font-bold block mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Hello, I&apos;m {siteConfig.person.name}.
          </motion.span>
          <span className="text-muted-foreground text-2xl sm:text-4xl leading-snug block mt-4">
            I&apos;m a <span className="font-bold text-foreground">full-stack developer</span> passionate about building <span className="text-accent underline decoration-accent/30 underline-offset-4">scalable web apps</span>.
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium mt-6"
        >
          <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact me here <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <a href={cvData.cvUrl} target="_blank" rel="noopener noreferrer" download>
            <Button variant="secondary" className="group w-full sm:w-auto">
              Download CV <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </a>

          <div className="flex gap-4 sm:ml-2 mt-4 sm:mt-0">
            <Button variant="outline" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent border-border/50 transition-all hover:rotate-12">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&bcc=torrentprime825@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>

            <Button variant="outline" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent border-border/50 transition-all hover:-rotate-12">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Code className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2 className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
