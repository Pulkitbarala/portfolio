"use client";

import React, { useState } from "react";
import { Code, ExternalLink, ChevronDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

type ProjectProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  outcome?: string;
  role?: string;
  duration?: string;
};

interface ProjectsListProps {
  projects: ProjectProps[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [showAll, setShowAll] = useState(false);

  // Define hardcoded editorial metadata for the top 3 featured projects
  const featuredMetadata = [
    { role: "Lead Developer", duration: "8 Weeks" },
    { role: "Data Science Engineer", duration: "12 Weeks" },
    { role: "Full-Stack Engineer", duration: "10 Weeks" }
  ];

  const featuredProjects = projects.slice(0, 3).map((proj, idx) => ({
    ...proj,
    role: featuredMetadata[idx]?.role || "Developer",
    duration: featuredMetadata[idx]?.duration || "Ongoing"
  }));

  const remainingProjects = projects.slice(3);

  return (
    <div className="flex flex-col gap-24 w-full">
      
      {/* ──────────────────────────────────────────────────────── */}
      {/* FEATURED PROJECTS (Alternating Asymmetrical Layouts) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-28 w-full text-left">
        
        {/* Project 1: Secure Share - Text Left, Image Right */}
        {featuredProjects[0] && (
          <ScrollReveal delay={100} duration={700} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text details */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">[ FEATURED WORK 01 ]</span>
                {featuredProjects[0].outcome && (
                  <span className="font-mono text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {featuredProjects[0].outcome}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                {featuredProjects[0].title}
              </h3>
              
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light mt-1">
                {featuredProjects[0].description}
              </p>

              {/* Meta fields */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-border/40 py-4 my-2 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px] mb-1">ROLE</span>
                  <span className="text-foreground font-semibold">{featuredProjects[0].role}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px] mb-1">DURATION</span>
                  <span className="text-foreground font-semibold">{featuredProjects[0].duration}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {featuredProjects[0].tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/40 px-2.5 py-0.5 rounded uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-6 mt-2 text-xs font-mono uppercase">
                <a
                  href={featuredProjects[0].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground hover:text-accent font-bold transition-colors hover-underline"
                >
                  <Code size={14} />
                  View Source
                </a>
                <a
                  href={featuredProjects[0].demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground hover:text-accent font-bold transition-colors hover-underline"
                >
                  <ExternalLink size={14} />
                  Live Preview
                </a>
              </div>
            </div>

            {/* Image display */}
            <div className="lg:col-span-7 w-full">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border bg-muted shadow-sm group">
                <Image
                  src={featuredProjects[0].imageUrl}
                  alt={featuredProjects[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Project 2: Deepfake Detection - Image Left, Text Right (Soft Surface Container) */}
        {featuredProjects[1] && (
          <ScrollReveal delay={150} duration={700} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image display */}
            <div className="lg:col-span-7 w-full order-last lg:order-first">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border bg-muted shadow-sm group">
                <Image
                  src={featuredProjects[1].imageUrl}
                  alt={featuredProjects[1].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>

            {/* Text details */}
            <div className="lg:col-span-5 flex flex-col gap-4 border border-border/80 bg-muted/20 p-6 sm:p-8 rounded-lg">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">[ FEATURED WORK 02 ]</span>
                {featuredProjects[1].outcome && (
                  <span className="font-mono text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {featuredProjects[1].outcome}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                {featuredProjects[1].title}
              </h3>
              
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light mt-1">
                {featuredProjects[1].description}
              </p>

              {/* Meta fields */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-border/40 py-4 my-2 text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px] mb-1">ROLE</span>
                  <span className="text-foreground font-semibold">{featuredProjects[1].role}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block uppercase text-[10px] mb-1">DURATION</span>
                  <span className="text-foreground font-semibold">{featuredProjects[1].duration}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {featuredProjects[1].tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] text-muted-foreground bg-card border border-border/60 px-2.5 py-0.5 rounded uppercase">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-6 mt-2 text-xs font-mono uppercase">
                <a
                  href={featuredProjects[1].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground hover:text-accent font-bold transition-colors hover-underline"
                >
                  <Code size={14} />
                  View Source
                </a>
                <a
                  href={featuredProjects[1].demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground hover:text-accent font-bold transition-colors hover-underline"
                >
                  <ExternalLink size={14} />
                  Live Spaces
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Project 3: E-consult System - Full Screenshot, Asymmetric Details Below */}
        {featuredProjects[2] && (
          <ScrollReveal delay={200} duration={700} className="flex flex-col gap-6 w-full">
            {/* Header border */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">[ FEATURED WORK 03 ]</span>
              {featuredProjects[2].outcome && (
                <span className="font-mono text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  {featuredProjects[2].outcome}
                </span>
              )}
            </div>

            {/* Large screenshot */}
            <div className="relative aspect-[21/9] w-full rounded-lg overflow-hidden border border-border bg-muted shadow-sm group">
              <Image
                src={featuredProjects[2].imageUrl}
                alt={featuredProjects[2].title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

            {/* Asymmetrical columns below */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-2 items-start">
              {/* Column 1: Info & Links */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-foreground leading-tight">
                  {featuredProjects[2].title}
                </h3>
                
                {/* Meta details */}
                <div className="flex gap-6 text-xs font-mono border-t border-b border-border/40 py-3.5 w-full">
                  <div>
                    <span className="text-muted-foreground uppercase text-[9px] block">ROLE</span>
                    <span className="text-foreground font-semibold">{featuredProjects[2].role}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground uppercase text-[9px] block">DURATION</span>
                    <span className="text-foreground font-semibold">{featuredProjects[2].duration}</span>
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 mt-1 text-xs font-mono uppercase">
                  <a
                    href={featuredProjects[2].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-foreground hover:text-accent font-bold transition-colors hover-underline"
                  >
                    <Code size={14} />
                    Source
                  </a>
                  <a
                    href={featuredProjects[2].demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-foreground hover:text-accent font-bold transition-colors hover-underline"
                  >
                    <ExternalLink size={14} />
                    Live Portal
                  </a>
                </div>
              </div>

              {/* Column 2: Overview */}
              <div className="md:col-span-5 text-muted-foreground text-sm leading-relaxed font-light">
                {featuredProjects[2].description}
              </div>

              {/* Column 3: Tech Tags */}
              <div className="md:col-span-3 flex flex-wrap gap-1.5 justify-start md:justify-end">
                {featuredProjects[2].tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] text-muted-foreground bg-muted border border-border/40 px-2.5 py-0.5 rounded uppercase h-fit">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* DIRECTORY TABLE FOR REMAINING PROJECTS */}
      {/* ──────────────────────────────────────────────────────── */}
      {remainingProjects.length > 0 && (
        <div className="flex flex-col gap-6 text-left mt-8">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">
              [ ADDITIONAL WORKS & EXPERIMENTS ]
            </span>
          </div>

          <div className="flex flex-col w-full font-mono text-xs">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-3 border-b border-border text-muted-foreground uppercase font-bold text-[10px] tracking-wider">
              <div className="col-span-4 md:col-span-3">Project</div>
              <div className="hidden md:block md:col-span-4">Stack</div>
              <div className="col-span-5 md:col-span-3">Outcome</div>
              <div className="col-span-3 md:col-span-2 text-right">Links</div>
            </div>

            {/* Table Rows */}
            {remainingProjects.slice(0, showAll ? undefined : 2).map((proj, idx) => (
              <ScrollReveal
                key={proj.title}
                delay={idx * 100}
                duration={500}
                className="grid grid-cols-12 gap-4 py-5 border-b border-border/50 hover:bg-muted/15 items-center group transition-colors duration-200"
              >
                <div className="col-span-4 md:col-span-3 font-sans text-sm font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                  {proj.title}
                </div>
                <div className="hidden md:block md:col-span-4 text-muted-foreground font-light text-[11px]">
                  {proj.tags.join(" • ")}
                </div>
                <div className="col-span-5 md:col-span-3 text-foreground/80 font-medium">
                  {proj.outcome || "Production-Ready"}
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-3 text-muted-foreground group-hover:text-foreground">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent p-1 transition-colors"
                    title="Code Source"
                  >
                    <Code size={14} />
                  </a>
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent p-1 transition-colors"
                    title="Live Preview"
                  >
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Load More Button */}
          {remainingProjects.length > 2 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider font-bold border border-border/80 bg-card hover:bg-muted/30 px-6 h-10 rounded-lg cursor-pointer transition-editorial group"
              >
                {showAll ? "Collapse List" : "Expand All Projects"}
                <ChevronDown className={`ml-2 h-3.5 w-3.5 transition-transform duration-220 ${showAll ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default ProjectsList;
