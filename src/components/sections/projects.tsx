"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import projectsData from "@/data/project.json";
import { Code, ExternalLink, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
};

const INITIAL_PROJECTS_COUNT = 6;

function ProjectCard({ title, description, tags, imageUrl, githubUrl, demoUrl }: ProjectProps) {
  const hasImage = typeof imageUrl === "string" && imageUrl.trim().length > 0;

  return (
    <Card className="h-full overflow-hidden flex flex-col p-0 group">
      <div className="relative h-48 w-full overflow-hidden border-b border-border/50 bg-muted/20">
        {hasImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6 flex-grow">{description}</p>
        
        <ul className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <li
              className="bg-accent/10 text-accent px-2.5 py-1 text-[0.65rem] uppercase tracking-wider rounded-md font-semibold"
              key={index}
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 mt-auto">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium hover:text-accent transition-colors">
            <Code className="w-4 h-4 mr-1.5" /> Code
          </a>
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium hover:text-accent transition-colors">
            <ExternalLink className="w-4 h-4 mr-1.5" /> Demo
          </a>
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, INITIAL_PROJECTS_COUNT);

  return (
    <section id="projects" className="scroll-mt-28 mb-28 px-4 max-w-6xl mx-auto w-full">
      <SectionHeading subtitle="A selection of my recent work.">My Projects</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index % 6 * 0.1 }}
              layout
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projectsData.length > INITIAL_PROJECTS_COUNT && (
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button 
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="group"
          >
            {showAll ? "Show Less" : "Load More Projects"}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-y-1"}`} />
          </Button>
        </motion.div>
      )}
    </section>
  );
}
