"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Send } from "lucide-react";
import Image from "next/image";
import { profile, socials } from "@/data/portfolio";
import { SocialIcon } from "./icons";
import { Terminal } from "./Terminal";
import { TechBadge } from "./ui";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const heroSocials = socials.filter((s) => s.key !== "phone");

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden pt-24 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* background: grid + soft glow */}
      <div aria-hidden="true" className="bg-grid mask-fade pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:gap-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 [&>*]:min-w-0">
        {/* Left */}
        <div>
          <motion.div {...fade(0)} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-green" />
            </span>
            <span>
              status: <span className="text-fg">building backend &amp; AI systems</span>
            </span>
          </motion.div>

          <motion.p {...fade(0.05)} className="font-mono text-sm text-muted sm:text-base">
            <span className="text-violet">fmt</span>.<span className="text-blue">Println</span>(
            <span className="text-string">&quot;Hello, World! I&apos;m&quot;</span>)
          </motion.p>

          <motion.h1
            {...fade(0.1)}
            id="hero-heading"
            className="mt-3 text-5xl font-semibold tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            Jaseem C<span className="text-blue">.</span>
          </motion.h1>

          <motion.p {...fade(0.15)} className="mt-4 text-xl font-medium text-fg sm:text-2xl">
            {profile.title}
            <span className="mt-1 block font-mono text-sm font-normal text-muted sm:text-base">
              <span className="text-green">{"// "}</span>
              {profile.subtitle}
            </span>
          </motion.p>

          <motion.p {...fade(0.2)} className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-fg/90 sm:text-xl">
            {profile.headline}
          </motion.p>
          <motion.p {...fade(0.25)} className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-6 flex flex-wrap items-center gap-2">
            {profile.primaryLanguages.map((l) => (
              <TechBadge key={l} name={l} />
            ))}
            <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
              <MapPin size={13} aria-hidden="true" className="text-orange" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div {...fade(0.35)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              View My Projects
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.cvUrl}
              download={profile.cvFileName}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-blue/60"
            >
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-medium text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <Send size={15} aria-hidden="true" />
              Contact Me
            </a>
          </motion.div>

          <motion.ul {...fade(0.4)} className="mt-9 flex items-center gap-2" aria-label="Social profiles">
            {heroSocials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-fg"
                >
                  <SocialIcon name={s.key} size={17} />
                </a>
              </li>
            ))}
          </motion.ul>

          {/* On phones the terminal sits below the intro instead of over the photo */}
          <Terminal className="mt-10 sm:hidden" />
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-first mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:order-none lg:mr-0 lg:max-w-[400px]"
        >
          <span aria-hidden="true" className="absolute -top-7 -left-2 hidden font-mono sm:block text-5xl text-line-strong select-none">
            {"{"}
          </span>
          <span aria-hidden="true" className="absolute -right-2 bottom-24 hidden font-mono sm:block text-5xl text-line-strong select-none sm:-right-6">
            {"}"}
          </span>

          <figure className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface p-2 shadow-2xl shadow-black/25">
            <div className="flex items-center justify-between px-2 pt-1 pb-2.5">
              <span className="font-mono text-[11px] text-subtle">profile.jpg</span>
              <span className="font-mono text-[11px] text-subtle">900 × 1125</span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={profile.photo}
                alt="Portrait of Jaseem C, Software Engineer"
                fill
                priority
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 400px, 90vw"
                className="object-cover object-top"
              />
            </div>
          </figure>

          <Terminal className="relative z-10 -mt-16 ml-auto hidden w-[92%] sm:block lg:-ml-24 lg:w-[110%]" />
        </motion.div>
      </div>
    </section>
  );
}
