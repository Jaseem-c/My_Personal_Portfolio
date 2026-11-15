import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { MotionProvider } from "@/components/MotionProvider";
import { profile, socials } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const siteUrl = getSiteUrl();
const title = "Jaseem C | Software Engineer – Backend & AI Applications";
const description =
  "Portfolio of Jaseem C, a Software Engineer specializing in backend development, Golang, Python, and Generative AI applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Jaseem C" },
  description,
  applicationName: "Jaseem C — Portfolio",
  authors: [{ name: "Jaseem C", url: siteUrl }],
  creator: "Jaseem C",
  keywords: [
    "Jaseem C",
    "Software Engineer",
    "Backend Developer",
    "Golang Developer",
    "Python Developer",
    "AI Application Engineer",
    "Generative AI",
    "RAG",
    "FastAPI",
    "Go Fiber",
    "Dubai",
    "UAE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Jaseem C",
    title,
    description,
    locale: "en_US",
    firstName: "Jaseem",
    lastName: "C",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0c10" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
  ],
  colorScheme: "dark light",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.fullTitle,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: socials.filter((s) => s.key === "github" || s.key === "linkedin").map((s) => s.href),
  knowsAbout: ["Golang", "Python", "JavaScript", "Backend Engineering", "REST APIs", "Generative AI", "RAG"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Sree Narayana Gurukulam College of Engineering" },
    { "@type": "CollegeOrUniversity", name: "Sree Neelakanta Government Sanskrit College" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
