"use client";

import React from "react";
import { ProjectsList } from "./projects-list";
import projectsData from "@/data/project.json";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-16 px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      {/* Editorial horizontal grid border */}
      <div className="editorial-grid-line mb-12 opacity-60" />

      <div className="text-left mb-12">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold block mb-2">
          04 // SELECTED PORTFOLIO
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
          Projects
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm font-light mt-4 max-w-md uppercase leading-relaxed font-mono">
          A catalog of deployed web products, security tools, and automation experiments.
        </p>
      </div>

      <div className="relative z-10 w-full">
        <ProjectsList projects={projectsData} />
      </div>
    </section>
  );
}

export default Projects;
