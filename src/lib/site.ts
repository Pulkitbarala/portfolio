export const siteConfig = {
  name: "Pulkit Portfolio",
  title: "Pulkit Barala | Full-Stack Developer & Data Science Engineer",
  description:
    "Portfolio of Pulkit Barala, a full-stack developer building React and Next.js applications with thoughtful UX, strong performance, and practical data-driven problem solving.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  locale: "en_US",
  keywords: [
    "Pulkit Barala",
    "Full-stack developer",
    "Next.js developer",
    "React developer",
    "Data-driven developer",
    "TypeScript",
    "Portfolio",
    "Web development",
  ],
  person: {
    name: "Pulkit Barala",
    role: "Full-Stack Developer",
    email: "torrentprime825@gmail.com",
  },
  links: {
    github: "https://github.com/Pulkitbarala",
    linkedin: "https://www.linkedin.com/in/pulkitbarala",
    twitter: "https://twitter.com/pulkitbarala",
  },
} as const;
