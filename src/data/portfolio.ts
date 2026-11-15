import type {
  Education,
  Experience,
  MiniProject,
  NavItem,
  Project,
  ProjectCategory,
  SkillGroup,
  SocialLink,
} from "@/types";

/**
 * Single source of truth for all portfolio content.
 * Everything here is taken from Jaseem's CV — edit this file to update the site.
 */

export const profile = {
  name: "Jaseem C",
  shortName: "Jaseem",
  title: "Software Engineer",
  subtitle: "Backend Engineering | AI Applications",
  fullTitle: "Software Engineer | AI Application Engineer",
  experience: "1.5+ years",
  location: "Dubai, UAE",
  email: "seamjaseem@gmail.com",
  phone: "+971 50 110 4384",
  phoneHref: "tel:+971501104384",
  headline: "Building scalable backend systems and intelligent AI-powered applications.",
  intro:
    "I'm a Software Engineer with 1.5+ years of experience in backend application development, enterprise systems, and Generative AI applications. I enjoy building reliable backend services, real-time applications, and intelligent solutions using modern technologies.",
  primaryLanguages: ["Go", "Python", "JavaScript"],
  cvUrl: "/documents/Jaseem_C_CV.pdf",
  cvFileName: "Jaseem_C_Software_Engineer_CV.pdf",
  photo: "/images/profile.jpg",
} as const;

export const navItems: NavItem[] = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];

export const socials: SocialLink[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/jaseem-c",
    href: "https://linkedin.com/in/jaseem-c/",
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    value: "github.com/jaseem-c",
    href: "https://github.com/jaseem-c",
    external: true,
  },
  {
    key: "email",
    label: "Email",
    value: "seamjaseem@gmail.com",
    href: "mailto:seamjaseem@gmail.com",
    external: false,
  },
  {
    key: "phone",
    label: "Phone",
    value: "+971 50 110 4384",
    href: "tel:+971501104384",
    external: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/971501104384",
    external: true,
  },
];

export const about = {
  quote: "More than writing code, I enjoy building solutions that solve real-world problems.",
  paragraphs: [
    "I'm a backend-focused Software Engineer with 1.5+ years of professional experience building production applications with Golang and Python. Most of my work has been in enterprise manufacturing software — REST APIs, data synchronization services and real-time systems that run on the shop floor.",
    "Alongside backend engineering, I build Generative AI applications: Retrieval-Augmented Generation (RAG) systems with document processing, embeddings, vector search, query expansion and reranking, and LLM-powered assistants integrated into real products.",
    "I care about the fundamentals that keep software dependable — clean API design, solid database work, containerized deployments, monitoring and structured logging — and I'm most interested in where scalable backend systems meet practical AI.",
  ],
  highlights: [
    "REST API architecture",
    "Database management",
    "Enterprise applications",
    "Real-time systems",
    "Generative AI & RAG",
  ],
};

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "IndustryApps",
    location: "Kochi, India",
    start: "Nov 2024",
    end: "Mar 2026",
    type: "Full-time",
    summary:
      "Built backend services, real-time systems and AI assistants for enterprise manufacturing applications.",
    highlights: [
      "Independently architected and delivered production applications — including a Manufacturing Execution System (MES Lite) and a real-time Digital Error Collection system — from design to deployment.",
      "Built Go (Fiber) REST APIs with a PocketBase backend to manage machine lifecycle events, operator assignments, job scheduling and real-time production data for shop-floor operations.",
      "Developed and integrated AI-powered chatbots into enterprise applications, enabling natural-language interaction with application data, backend services and business workflows.",
      "Built React and CopilotKit-based AI chat assistants for microservice applications, connecting LLM-powered conversational interfaces to backend APIs.",
      "Designed an ERP-to-MES data synchronization service using goroutines and cron-based scheduling for concurrent, automated job data transfer.",
      "Integrated real-time communication with MQTT and Server-Sent Events (SSE) for low-latency live updates between backend services and dashboards.",
      "Dockerized backend services and set up Prometheus/Grafana monitoring with structured logging for reliable deployments and troubleshooting.",
    ],
    tech: [
      "Go",
      "Fiber",
      "PocketBase",
      "Python",
      "React",
      "CopilotKit",
      "MQTT",
      "SSE",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    role: "MERN Stack Developer Intern",
    company: "Luminar TechnoHub",
    location: "Kochi, India",
    start: "Aug 2024",
    end: "Nov 2024",
    type: "Internship",
    summary: "Full-stack web development with the MERN stack in an agile team, under mentorship.",
    highlights: [
      "Developed and deployed full-stack web applications using MongoDB, Express.js, React.js and Node.js in an agile team environment.",
      "Built responsive UI components and RESTful API integrations, working with real-world development workflows.",
      "Used Git for version control and took part in code review practices.",
    ],
    note: "Preceded by an intensive MERN Stack training program at Luminar Technolab (Feb 2024 – Aug 2024) covering advanced JavaScript, React state management and backend API development.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Git"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    file: "languages.go",
    title: "Programming Languages",
    items: ["Go", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    file: "backend.py",
    title: "Backend Development",
    items: ["FastAPI", "Go Fiber", "Node.js", "Express.js", "REST APIs", "Swagger / OpenAPI"],
  },
  {
    file: "genai.py",
    title: "AI & Generative AI",
    items: [
      "LLMs",
      "Generative AI",
      "Prompt Engineering",
      "RAG",
      "Embeddings",
      "Vector Search",
      "Query Expansion",
      "AI Agents",
    ],
  },
  {
    file: "frontend.tsx",
    title: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    file: "databases.sql",
    title: "Databases",
    items: ["MongoDB", "PocketBase", "MySQL", "MS SQL"],
  },
  {
    file: "infra.yml",
    title: "DevOps & Infrastructure",
    items: ["Docker", "Git", "GitHub", "Lens", "Prometheus", "Grafana", "Keycloak"],
  },
  {
    file: "ai_tools.yaml",
    title: "AI Frameworks & Tools",
    items: ["LangChain", "ChromaDB"],
  },
  {
    file: "dev_tools.json",
    title: "AI Developer Tools",
    items: ["Cursor", "Claude", "ChatGPT", "Gemini API", "GitHub Copilot"],
  },
];

export const projectCategories: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI / GenAI" },
  { id: "data", label: "Data & IoT" },
];

export const projects: Project[] = [
  {
    slug: "mes-lite",
    name: "MES Lite",
    tagline: "Manufacturing Execution System",
    description:
      "A manufacturing execution system that manages machine operations, job scheduling, operator assignments and real-time production data at the shop-floor level.",
    problem:
      "Shop-floor teams need one reliable system to coordinate machines, jobs and operators — without conflicting job operations or gaps in downtime data.",
    contributions: [
      "Independently designed and developed the full system.",
      "Built REST APIs in Go (Fiber) backed by PocketBase, with business-logic middleware for sequencing rules and input validation.",
      "Containerized the backend with Docker and added structured JSON logging with rotation.",
    ],
    features: [
      "Machine sequencing rules",
      "Job-operation validation",
      "Downtime tracking",
      "Pause / resume logic",
      "Structured JSON logging",
    ],
    tech: ["Go", "Fiber", "PocketBase", "MS SQL", "REST APIs", "Docker"],
    language: "Go",
    categories: ["backend"],
    role: "Independent build",
  },
  {
    slug: "erp-job-sync",
    name: "ERP-Job Sync",
    tagline: "Automated ERP integration service",
    description:
      "A Golang service that synchronizes job data between external ERP systems and enterprise applications, keeping records accurate and consistent across platforms.",
    problem:
      "Job data has to move between ERP and MES platforms automatically and reliably — even with high record volumes, API failures and unstable networks.",
    contributions: [
      "Architected and delivered the production synchronization service.",
      "Implemented cron-based scheduling and goroutines for concurrent sync processing, improving throughput for high volumes of job records.",
      "Designed sync status tracking with retry logic, error handling and structured logging.",
    ],
    features: [
      "Concurrent processing",
      "Cron scheduling",
      "Sync status tracking",
      "Retry logic",
      "Error handling",
    ],
    tech: ["Go", "Goroutines", "Cron Jobs", "REST APIs", "Docker"],
    language: "Go",
    categories: ["backend"],
    role: "Architect & developer",
  },
  {
    slug: "ai-manufacturing-knowledge-assistant",
    name: "AI Manufacturing Knowledge Assistant",
    tagline: "Enterprise RAG assistant",
    description:
      "An enterprise RAG-based AI assistant for querying MES, CAD, work-instruction and technical documentation in natural language.",
    problem:
      "Engineers need fast, trustworthy answers buried across technical documents — and need to verify those answers against the source.",
    contributions: [
      "Developed the RAG pipeline and FastAPI backend.",
      "Implemented LLM-based query expansion, vector retrieval and Cross-Encoder reranking to surface the most relevant document chunks.",
      "Built context-grounded LLM responses with source citations to reduce hallucinations.",
    ],
    features: [
      "Query expansion",
      "Vector retrieval",
      "Cross-Encoder reranking",
      "Context-grounded answers",
      "Source citations",
    ],
    tech: ["Python", "FastAPI", "RAG", "LLMs", "ChromaDB", "Embeddings", "React"],
    language: "Python",
    categories: ["ai", "backend"],
    role: "Developer",
  },
  {
    slug: "quality-pulse",
    name: "Quality Pulse",
    tagline: "Product scrap management application",
    description:
      "A data-driven application that evaluates and classifies manufactured products as Pass or Fail using CPK (Process Capability Index) values and multi-characteristic sampling.",
    problem:
      "Quality engineers need a quick way to classify products and spot scrap trends and manufacturing performance issues.",
    contributions: [
      "Contributed to building the application with Python, Dash and Plotly.",
      "Built interactive dashboards and data visualizations for scrap-trend analysis.",
      "Implemented mass entry, single entry and result-editing workflows with remarks, integrated with a transaction application on the same platform.",
    ],
    features: [
      "CPK-based classification",
      "Interactive dashboards",
      "Mass & single data entry",
      "Result editing with remarks",
    ],
    tech: ["Python", "Dash", "Plotly", "Data Visualization"],
    language: "Python",
    categories: ["data"],
    role: "Contributor",
  },
];

export const otherProjects: MiniProject[] = [
  {
    name: "KPI Reports Dashboard",
    description: "Streamlit-based KPI reporting dashboards for operational insights.",
    tech: ["Python", "Streamlit"],
    language: "Python",
    categories: ["data"],
  },
  {
    name: "Node-RED Data Simulation & Visualization",
    description: "MQTT data simulation flows and visual dashboards for real-time IoT data.",
    tech: ["Node-RED", "MQTT"],
    categories: ["data"],
  },
  {
    name: "Built-in CopilotKit Chatbot",
    description: "An AI-powered assistant interface implemented within a product platform.",
    tech: ["CopilotKit", "React", "LLMs"],
    categories: ["ai"],
  },
];

export const education: Education[] = [
  {
    degree: "Master of Computer Applications",
    institution: "Sree Narayana Gurukulam College of Engineering",
    start: "2022",
    end: "2024",
    location: "Kolanchery, Kerala",
  },
  {
    degree: "B.Sc. Physics",
    institution: "Sree Neelakanta Government Sanskrit College",
    start: "2019",
    end: "2022",
    location: "Pattambi, Kerala",
  },
];

export const languageColors: Record<string, string> = {
  Go: "#00ADD8",
  Python: "#3572A5",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
};
