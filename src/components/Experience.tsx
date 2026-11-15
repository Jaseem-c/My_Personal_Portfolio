import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { Reveal, SectionHeading, TechBadge } from "./ui";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative border-t border-line bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="experience"
          title={<span id="experience-heading">Where I&apos;ve worked</span>}
          description="Backend services, real-time systems and AI assistants for enterprise manufacturing software — plus the full-stack foundation that came before."
        />

        <ol className="relative space-y-10">
          {/* git-graph line */}
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[9px] w-px bg-gradient-to-b from-blue/60 via-line-strong to-transparent md:left-[171px]" />

          {experiences.map((exp, idx) => (
            <li key={exp.company} className="relative grid gap-4 pl-10 md:grid-cols-[150px_1fr] md:gap-10 md:pl-0">
              {/* commit node */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-0 flex size-[19px] items-center justify-center rounded-full border border-line-strong bg-bg md:left-[162px]"
              >
                <span className={`size-2 rounded-full ${idx === 0 ? "bg-blue" : "bg-violet"}`} />
              </span>

              <Reveal className="font-mono text-xs text-muted md:pt-1.5 md:text-right">
                <p className="text-fg">{exp.start} — {exp.end}</p>
                <p className="mt-1 text-subtle">{exp.type}</p>
              </Reveal>

              <Reveal delay={0.05} className="md:pl-8">
                <article className="group rounded-xl border border-line bg-surface transition-colors hover:border-line-strong">
                  <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
                    <div>
                      <h3 className="text-lg font-semibold text-fg">{exp.role}</h3>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-blue">
                        <Briefcase size={14} aria-hidden="true" />
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 font-mono text-xs text-muted sm:items-end">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={12} aria-hidden="true" />
                        {exp.start} – {exp.end}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} aria-hidden="true" />
                        {exp.location}
                      </span>
                    </div>
                  </header>

                  <div className="px-5 py-5 sm:px-6">
                    <p className="mb-4 font-mono text-[13px] text-muted">
                      <span className="text-green">{"// "}</span>
                      {exp.summary}
                    </p>
                    <ul className="space-y-2.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                          <span aria-hidden="true" className="mt-[3px] font-mono text-xs text-blue">→</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.note && (
                      <p className="mt-4 rounded-lg border border-dashed border-line-strong px-4 py-3 text-sm text-muted">
                        <span className="font-mono text-xs text-violet">note: </span>
                        {exp.note}
                      </p>
                    )}
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
                      {exp.tech.map((t) => (
                        <li key={t}>
                          <TechBadge name={t} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
