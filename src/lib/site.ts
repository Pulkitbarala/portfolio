export const siteConfig = {
  name: "Pulkit Portfolio",
  title: "Pulkit Portfolio | Full-Stack Developer",
  description:
    "Modern, premium full-stack developer portfolio showcasing projects, skills, and experience.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  locale: "en_US",
  keywords: [
    "Full-stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Portfolio",
    "Web development",
  ],
  person: {
    name: "Pulkit",
    role: "Full-Stack Developer",
    email: "torrentprime825@gmail.com",
  },
  links: {
    github: "https://github.com",
  },
} as const;
