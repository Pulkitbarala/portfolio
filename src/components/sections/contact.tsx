"use client";

import React from "react";
import { Mail, MapPin, Share2 } from "lucide-react";
import { ContactForm } from "./contact-form";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-16 px-6 max-w-6xl mx-auto w-full"
      aria-labelledby="contact-heading"
    >
      {/* Editorial horizontal grid line */}
      <div className="editorial-grid-line mb-12 opacity-60" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
        
        {/* Left Column: Asymmetric Contact info */}
        <ScrollReveal delay={100} duration={600} className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-accent font-bold block mb-2">
              07 // INQUIRY
            </span>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
              Contact
            </h2>
            <p className="text-muted-foreground text-sm font-light mt-6 leading-relaxed max-w-sm">
              I&apos;m currently available for freelance integrations, contract work, and full-time software engineering roles. Let&apos;s build something together.
            </p>
          </div>

          <div className="flex flex-col gap-6 font-mono text-xs uppercase mt-2">
            
            {/* Email inquiry */}
            <div className="flex flex-col border-b border-border/40 pb-4">
              <span className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 font-bold">
                <Mail size={12} className="text-accent" />
                EMAIL DIRECT
              </span>
              <a 
                href={`mailto:${siteConfig.person.email}`} 
                className="text-sm font-bold text-foreground hover:text-accent transition-colors w-fit hover-underline"
              >
                {siteConfig.person.email}
              </a>
            </div>

            {/* Location */}
            <div className="flex flex-col border-b border-border/40 pb-4">
              <span className="text-[10px] text-muted-foreground mb-1.5 flex items-center gap-1.5 font-bold">
                <MapPin size={12} className="text-accent" />
                OFFICE LOCATION
              </span>
              <span className="text-sm font-bold text-foreground">
                DELHI, INDIA // REMOTE GLOBAL
              </span>
            </div>

            {/* Socials */}
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1.5 font-bold">
                <Share2 size={12} className="text-accent" />
                NETWORKS
              </span>
              <div className="flex gap-4">
                <a 
                  href={siteConfig.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent font-bold hover-underline"
                >
                  GITHUB
                </a>
                <a 
                  href={siteConfig.links.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent font-bold hover-underline"
                >
                  LINKEDIN
                </a>
                <a 
                  href={siteConfig.links.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent font-bold hover-underline"
                >
                  TWITTER
                </a>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Right Column: Contact Form */}
        <ScrollReveal delay={250} duration={600} className="lg:col-span-7 w-full">
          <ContactForm />
        </ScrollReveal>

      </div>
    </section>
  );
}

export default Contact;
