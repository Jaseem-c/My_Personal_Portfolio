import { skillGroups } from "@/data/portfolio";
import { TechIcon } from "./icons";
import { Reveal, SectionHeading } from "./ui";

const wide = new Set(["genai.py", "infra.yml", "ai_tools.yaml", "dev_tools.json"]);
const accents = ["text-blue", "text-green", "text-violet", "text-orange", "text-cyan", "text-pink", "text-blue", "text-violet"];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative border-t border-line py-24 sm:py-32">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="tech_stack"
          title={<span id="skills-heading">Tools I build with</span>}
          description="The languages, frameworks and infrastructure I use to ship backend services and AI applications."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 4) * 0.05} className={wide.has(group.file) ? "sm:col-span-2" : undefined}>
              <article className="h-full rounded-xl border border-line bg-surface/90 p-5 transition-colors duration-300 hover:border-line-strong hover:bg-surface">
                <header className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-fg">{group.title}</h3>
                  <span className={`font-mono text-[11px] ${accents[i % accents.length]}`}>{group.file}</span>
                </header>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-xs text-fg/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
                    >
                      <TechIcon name={item} size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
