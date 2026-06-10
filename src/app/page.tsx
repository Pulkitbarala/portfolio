import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { LazySection } from "@/components/ui/lazy-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const personSchema = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.person.name,
    url: siteConfig.url,
    jobTitle: siteConfig.person.role,
    description: siteConfig.description,
    email: siteConfig.person.email,
    knowsAbout: [...siteConfig.keywords],
    sameAs: [siteConfig.links.github].filter(Boolean),
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#person`
    }
  };

  const webpageSchema = {
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`
    },
    about: {
      "@id": `${siteConfig.url}/#person`
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, webpageSchema]
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero renders immediately for fast LCP */}
      <Hero />
      <div className="w-full h-24 bg-gradient-to-b from-transparent to-background/5" />

      {/* Below-fold sections only render when approaching viewport */}
      <LazySection minHeight="300px">
        <About />
      </LazySection>
      <LazySection minHeight="400px">
        <Skills />
      </LazySection>
      <LazySection minHeight="600px">
        <Projects />
      </LazySection>
      <LazySection minHeight="400px">
        <Services />
      </LazySection>
      <LazySection minHeight="300px">
        <Testimonials />
      </LazySection>
      <LazySection minHeight="500px">
        <Contact />
      </LazySection>
    </div>
  );
}

