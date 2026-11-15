"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookMarked, Check, ExternalLink, FolderGit2, Lock, User } from "lucide-react";
import { useState } from "react";
import { languageColors, otherProjects, projectCategories, projects } from "@/data/portfolio";
import type { MiniProject, Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons";
import { Reveal, SectionHeading, TechBadge } from "./ui";

type Filter = "all" | ProjectCategory;

function LanguageDot({ language }: { language?: string }) {
  if (!language) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2.5 rounded-full" style={{ background: languageColors[language] ?? "var(--subtle)" }} />
      {language}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-xl hover:shadow-black/10">
      <header className="border-b border-line px-5 pt-5 pb-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex min-w-0 items-start gap-2 text-[17px] leading-snug font-semibold text-blue">
            <BookMarked size={16} aria-hidden="true" className="mt-1 shrink-0 text-muted" />
            <span>{project.name}</span>
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line-strong px-2 py-0.5 text-[11px] font-medium text-muted">
            <Lock size={10} aria-hidden="true" />
            Private
          </span>
        </div>
        <p className="mt-1 pl-6 font-mono text-xs text-muted">{project.tagline}</p>
      </header>

      <div className="flex flex-1 flex-col gap-5 px-5 py-5 sm:px-6">
        <p className="text-[15px] leading-relaxed text-fg/85">{project.description}</p>

        <div className="rounded-lg border-l-2 border-orange/70 bg-surface-2 px-4 py-3">
          <p className="font-mono text-[11px] tracking-wide text-orange uppercase">Problem</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{project.problem}</p>
        </div>

        <div>
          <p className="mb-2 font-mono text-[11px] tracking-wide text-violet uppercase">My contributions</p>
          <ul className="space-y-2">
            {project.contributions.map((c) => (
              <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-fg/80">
                <span aria-hidden="true" className="font-mono text-xs leading-6 text-violet">›</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-mono text-[11px] tracking-wide text-green uppercase">Key features</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {project.features.map((f) => (
              <li key={f} className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Check size={13} aria-hidden="true" className="text-green" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t}>
              <TechBadge name={t} />
            </li>
          ))}
        </ul>
      </div>

      <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-5 py-3.5 font-mono text-xs text-muted sm:px-6">
        <LanguageDot language={project.language} />
        <span className="inline-flex items-center gap-1.5">
          <User size={12} aria-hidden="true" />
          {project.role}
        </span>
        <span className="ml-auto flex items-center gap-3">
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <GithubIcon size={13} /> Code
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-subtle" title="Built for an employer — source code is not public">
              <Lock size={12} aria-hidden="true" /> Professional project
            </span>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <ExternalLink size={12} aria-hidden="true" /> Live
            </a>
          )}
        </span>
      </footer>
    </article>
  );
}

function MiniCard({ project }: { project: MiniProject }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong">
      <h4 className="flex items-center gap-2 text-[15px] font-semibold text-fg">
        <FolderGit2 size={15} aria-hidden="true" className="shrink-0 text-blue" />
        {project.name}
      </h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
        {project.tech.map((t) => (
          <li key={t}>
            <TechBadge name={t} />
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const match = (cats: ProjectCategory[]) => filter === "all" || cats.includes(filter);
  const featured = projects.filter((p) => match(p.categories));
  const others = otherProjects.filter((p) => match(p.categories));

  const counts = Object.fromEntries(
    projectCategories.map((c) => [
      c.id,
      [...projects, ...otherProjects].filter((p) => c.id === "all" || p.categories.includes(c.id)).length,
    ]),
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative border-t border-line bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          label="featured_projects"
          title={<span id="projects-heading">Things I&apos;ve built</span>}
          description="Production systems from my professional work. These were built for an employer, so their source code isn't public — the details below describe my role and the engineering involved."
        />

        <Reveal>
          <div role="tablist" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
            {projectCategories.map((c) => {
              const selected = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="project-grid"
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-[13px] transition-colors",
                    selected
                      ? "border-blue/50 bg-blue/10 text-fg"
                      : "border-line bg-surface text-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {c.label}
                  <span className={cn("rounded-full px-1.5 text-[11px]", selected ? "bg-blue/20 text-blue" : "bg-surface-2 text-subtle")}>
                    {counts[c.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div id="project-grid" role="tabpanel" aria-live="polite">
          <motion.div layout className="grid grid-cols-1 gap-5 lg:grid-cols-2 [&>*]:min-w-0">
            <AnimatePresence mode="popLayout" initial={false}>
              {featured.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {others.length > 0 && (
            <motion.div layout className="mt-14">
              <h3 className="mb-5 flex items-center gap-3 font-mono text-sm text-muted">
                <span className="text-green">{"//"}</span>
                <span className="text-fg">other_notable_contributions</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
                <AnimatePresence mode="popLayout" initial={false}>
                  {others.map((p) => (
                    <motion.div
                      key={p.name}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MiniCard project={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>

        <Reveal className="mt-12">
          <a
            href="https://github.com/jaseem-c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-fg"
          >
            <GithubIcon size={15} />
            More on github.com/jaseem-c
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
