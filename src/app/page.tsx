import type { Metadata } from "next";
import Script from "next/script";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
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

export const dynamic = "force-static";

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
    image: `${siteConfig.url}/images/og-image.png`,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter].filter(Boolean),
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
    "@graph": [personSchema, websiteSchema, webpageSchema,
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile`,
        "url": siteConfig.url,
        "name": siteConfig.person.name,
        "mainEntity": { "@id": `${siteConfig.url}/#person` },
        "sameAs": [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter].filter(Boolean)
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <Script
        id="json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero renders immediately for fast LCP */}
      <Hero />

      {/* Below-fold sections only render when approaching viewport */}
      <LazySection id="about" className="scroll-mt-20" minHeight="300px">
        <About />
      </LazySection>
      
      <LazySection id="experience" className="scroll-mt-20" minHeight="350px">
        <Experience />
      </LazySection>
      
      <LazySection id="skills" className="scroll-mt-20" minHeight="400px">
        <Skills />
      </LazySection>
      
      <LazySection id="projects" className="scroll-mt-20" minHeight="600px">
        <Projects />
      </LazySection>
      
      <LazySection minHeight="400px">
        <Services />
      </LazySection>
      
      <LazySection minHeight="300px">
        <Testimonials />
      </LazySection>
      
      <LazySection id="contact" className="scroll-mt-20" minHeight="500px">
        <Contact />
      </LazySection>
    </div>
  );
}

