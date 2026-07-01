import React from "react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/60 py-8 px-6 mt-16 text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
        <div>
          &copy; {new Date().getFullYear()} PULKIT BARALA. ALL RIGHTS RESERVED.
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors hover-underline"
          >
            GITHUB
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors hover-underline"
          >
            LINKEDIN
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors hover-underline"
          >
            TWITTER
          </a>
          <span className="text-border/60 hidden sm:inline">|</span>
          <span className="text-foreground/75 font-semibold">DELHI, INDIA // REMOTE</span>
        </div>
      </div>
    </footer>
  );
}
