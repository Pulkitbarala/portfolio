"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 min-h-[70vh] relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[8rem] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[20rem] h-[20rem] bg-accent/5 rounded-full blur-[6rem] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center z-10 max-w-xl"
      >
        {/* Animated Error Code */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <h1 className="text-8xl sm:text-9xl font-black tracking-widest text-foreground select-none relative z-10 opacity-90">
            404
          </h1>
          {/* Subtle glow behind the code */}
          <div className="absolute -inset-2 bg-accent/20 rounded-full blur-xl -z-10" />
        </motion.div>

        <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-foreground">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track.
        </p>

        {/* Helpful links grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
          <Link href="/#projects" className="group p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:bg-card/50 transition-all">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              <CornerDownRight className="h-4 w-4 text-accent" />
              View Projects
            </span>
            <p className="mt-1.5 text-xs text-muted-foreground">
              See what I&apos;ve built, including Secure Share and Deepfake detector.
            </p>
          </Link>
          
          <Link href="/#contact" className="group p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:bg-card/50 transition-all">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              <CornerDownRight className="h-4 w-4 text-accent" />
              Get In Touch
            </span>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Have a question or a freelance project? Let&apos;s discuss.
            </p>
          </Link>
        </div>

        {/* Main action button */}
        <div className="mt-10 flex items-center justify-center gap-4 w-full">
          <Link href="/">
            <Button className="group gap-2 px-6 h-12 text-sm font-medium">
              <Home className="h-4 w-4" />
              Back to Homepage
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
