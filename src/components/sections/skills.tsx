"use client";

import React, { useState } from "react";
import skillsData from "@/data/skills.json";

// Detailed custom usage description database for each skill to show on hover
const SKILL_DESCRIPTIONS: Record<string, string> = {
  HTML: "Structuring semantic web pages with proper accessibility (ARIA) and search engine visibility.",
  CSS: "Designing layouts with modern CSS architectures, custom variables, grid structures, and raw animations.",
  JavaScript: "Creating interactive client behaviors, manipulating DOM APIs, and coordinating async web flows.",
  TypeScript: "Enforcing type safety, mapping backend schemas, and preventing execution runtime errors.",
  React: "Building modular component systems, managing react states, hooks, and routing pipelines.",
  "Next.js": "Developing server-side rendered (SSR), SEO-optimized apps, server actions, and layout trees.",
  "Node.js": "Executing high-speed javascript processes on server stacks, coordinating microservices.",
  Git: "Coordinating multi-developer git branches, versioning releases, and CI/CD pipelines.",
  "Tailwind CSS": "Composing responsive layouts rapidly with consistent spacing tokens and utility variables.",
  Prisma: "Mapping database schemas to type-safe client methods to build clean Postgres queries.",
  MongoDB: "Modeling flexible non-relational document stores for real-time application pipelines.",
  PostgreSQL: "Structuring relational databases, writing queries, and normalizing data tables.",
  "Framer Motion": "Programming fine-tuned spring physics and scroll-linked UI transitions.",
  Express: "Building light-weight REST APIs and customized routing middlewares.",
  Python: "Writing data pipelines, scientific computing, and training deep learning networks.",
  Django: "Structuring robust backend applications with built-in admin, auth, and database ORMs.",
  Flask: "Setting up lightweight micro-framework services to deploy models and small web API scripts."
};

// Map skills to categories for interactive filtering
const SKILL_CATEGORIES: Record<string, string> = {
  HTML: "languages",
  CSS: "languages",
  JavaScript: "languages",
  TypeScript: "languages",
  Python: "languages",
  React: "ui",
  "Next.js": "ui",
  "Tailwind CSS": "ui",
  "Framer Motion": "ui",
  "Node.js": "backend",
  Express: "backend",
  Django: "backend",
  Flask: "backend",
  PostgreSQL: "backend",
  MongoDB: "backend",
  Prisma: "backend",
  Git: "tools"
};

const CATEGORIES = [
  { id: "all", label: "ALL TECH" },
  { id: "languages", label: "LANGUAGES" },
  { id: "ui", label: "FRONTEND / UI" },
  { id: "backend", label: "BACKEND & DATA" },
  { id: "tools", label: "DEV TOOLS" }
] as const;

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Filter skills based on chosen category
  const filteredSkills = skillsData.filter((skill) => {
    if (activeCategory === "all") return true;
    return SKILL_CATEGORIES[skill] === activeCategory;
  });

  return (
    <section
      id="skills"
      className="relative py-16 px-6 max-w-6xl mx-auto scroll-mt-20"
    >
      {/* Editorial horizontal grid border */}
      <div className="editorial-grid-line mb-12 opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column: Heading & Interactive Filters */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold block mb-2">
              03 // TOOLKIT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
              Skills & Stack
            </h2>
          </div>
          
          <p className="text-muted-foreground text-sm font-light max-w-sm">
            Interactive toolkit selector. Choose a category to filter my stack, or hover on a technology to log its project application details.
          </p>

          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-col gap-1.5 mt-2 max-w-xs font-mono text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setHoveredSkill(null);
                }}
                className={`flex items-center justify-between text-left py-2 px-3 rounded border transition-editorial select-none cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-accent text-accent-foreground border-transparent font-bold"
                    : "border-border/60 hover:border-muted-foreground/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75">
                  {cat.id === "all"
                    ? skillsData.length
                    : skillsData.filter((s) => SKILL_CATEGORIES[s] === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Skills Grid & Terminal Log */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Skill Tag Grid */}
          <div className="flex flex-wrap gap-2.5 min-h-[140px] items-start">
            {filteredSkills.map((skill) => (
              <button
                key={skill}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`font-mono text-xs uppercase tracking-wide border px-4 py-2 rounded transition-all duration-200 select-none cursor-default ${
                  hoveredSkill === skill
                    ? "bg-foreground text-background border-transparent"
                    : "border-border/80 text-foreground bg-muted/20"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Monospace Interactive Logging Box */}
          <div className="border border-border/80 bg-muted/40 p-5 rounded-lg font-mono text-[11px] sm:text-xs min-h-[100px] flex flex-col justify-between">
            <div>
              <div className="text-muted-foreground/60 uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                SYSTEM_LOG // PROJECT_APPLICATION_DATA
              </div>
              <div className="text-foreground/90 font-light leading-relaxed">
                {hoveredSkill ? (
                  <>
                    <span className="text-accent font-bold">&gt; {hoveredSkill}: </span>
                    {SKILL_DESCRIPTIONS[hoveredSkill] || "Used across various front-end and back-end integration tasks."}
                  </>
                ) : (
                  <span className="text-muted-foreground/60 italic">
                    &gt; hover over a technology above to inspect its real-world implementation detail...
                  </span>
                )}
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground/45 mt-4 self-end uppercase">
              active_category: {activeCategory}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Skills;
