import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Hero />
      <div className="w-full h-24 bg-gradient-to-b from-transparent to-background/5" />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
