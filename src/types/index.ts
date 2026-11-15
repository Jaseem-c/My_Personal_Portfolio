export type NavItem = {
  id: string;
  label: string;
};

export type SocialKey = "github" | "linkedin" | "email" | "whatsapp" | "phone";

export type SocialLink = {
  key: SocialKey;
  label: string;
  value: string;
  href: string;
  external: boolean;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  type: string;
  summary: string;
  highlights: string[];
  note?: string;
  tech: string[];
};

export type ProjectCategory = "backend" | "ai" | "data";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  contributions: string[];
  features: string[];
  tech: string[];
  language: string;
  categories: ProjectCategory[];
  role: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type MiniProject = {
  name: string;
  description: string;
  tech: string[];
  language?: string;
  categories: ProjectCategory[];
};

export type SkillGroup = {
  file: string;
  title: string;
  items: string[];
};

export type Education = {
  degree: string;
  institution: string;
  start: string;
  end: string;
  location: string;
};
