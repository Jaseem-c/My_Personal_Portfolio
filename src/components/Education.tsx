import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./ui";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="05" label="education" title={<span id="education-heading">Academic background</span>} />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <article className="relative h-full overflow-hidden rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-7">
                <span aria-hidden="true" className="absolute top-5 right-6 font-mono text-xs text-subtle">
                  {`[${i}]`}
                </span>
                <span className="flex size-11 items-center justify-center rounded-lg border border-line-strong bg-surface-2 text-violet">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <p className="mt-5 font-mono text-xs text-blue">
                  {e.start} — {e.end}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-fg">{e.degree}</h3>
                <p className="mt-1.5 text-muted">{e.institution}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                  <MapPin size={12} aria-hidden="true" />
                  {e.location}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
