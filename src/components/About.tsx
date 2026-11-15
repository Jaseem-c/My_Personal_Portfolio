import { about } from "@/data/portfolio";
import { Reveal, SectionHeading, WindowDots } from "./ui";

const K = ({ children }: { children: React.ReactNode }) => <span className="text-pink">{children}</span>;
const T = ({ children }: { children: React.ReactNode }) => <span className="text-orange">{children}</span>;
const F = ({ children }: { children: React.ReactNode }) => <span className="text-cyan">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-string">&quot;{children}&quot;</span>;
const C = ({ children }: { children: React.ReactNode }) => <span className="text-subtle italic">{children}</span>;

const codeLines: React.ReactNode[] = [
  <><K>package</K> main</>,
  <></>,
  <><K>type</K> <T>Engineer</T> <K>struct</K> {"{"}</>,
  <>{"  "}<F>Name</F>, <F>Role</F>, <F>Location</F> <T>string</T></>,
  <>{"  "}<F>Experience</F>{"          "}<T>string</T></>,
  <>{"  "}<F>Languages</F>, <F>Focus</F>{"    "}[]<T>string</T></>,
  <>{"}"}</>,
  <></>,
  <><K>var</K> jaseem = <T>Engineer</T>{"{"}</>,
  <>{"  "}<F>Name</F>:{"       "}<S>Jaseem C</S>,</>,
  <>{"  "}<F>Role</F>:{"       "}<S>Software Engineer</S>,</>,
  <>{"  "}<F>Location</F>:{"   "}<S>Dubai, UAE</S>,</>,
  <>{"  "}<F>Experience</F>: <S>1.5+ years</S>,</>,
  <>{"  "}<F>Languages</F>:{"  "}[]<T>string</T>{"{"}<S>Go</S>, <S>Python</S>, <S>JavaScript</S>{"}"},</>,
  <>{"  "}<F>Focus</F>:{"      "}[]<T>string</T>{"{"}</>,
  <>{"    "}<S>Backend Engineering</S>, <S>REST APIs</S>,</>,
  <>{"    "}<S>Generative AI</S>, <S>RAG Systems</S>,</>,
  <>{"  "}{"}"},</>,
  <>{"}"} <C>{"// ready to build"}</C></>,
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="01" label="about_me" title={<span id="about-heading">{about.quote}</span>} />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 [&>*]:min-w-0">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="leading-relaxed text-pretty text-muted sm:text-[17px]">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <ul className="flex flex-wrap gap-2 pt-3" aria-label="Areas of focus">
                {about.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-fg"
                  >
                    <span className="mr-1.5 text-green">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.25}>
              <dl className="mt-4 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-surface">
                {[
                  ["1.5+", "years experience"],
                  ["Go · Py", "primary backend"],
                  ["MCA", "postgraduate"],
                ].map(([v, l]) => (
                  <div key={l} className="px-4 py-4 sm:px-5">
                    <dt className="sr-only">{l}</dt>
                    <dd className="font-mono text-lg font-semibold text-fg sm:text-xl">{v}</dd>
                    <dd className="mt-1 text-xs text-muted">{l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-xl shadow-black/20">
              <div className="flex items-center gap-4 border-b border-line bg-surface-2 px-4">
                <WindowDots />
                <div className="flex">
                  <span className="border-x border-t-2 border-x-line border-t-blue bg-surface px-3 py-2 font-mono text-xs text-fg">
                    profile.go
                  </span>
                </div>
              </div>
              <pre
                className="overflow-x-auto py-4 font-mono text-[12px] leading-[1.75] sm:text-[13px]"
                aria-label="Profile summary written as Go code"
              >
                <code>
                  {codeLines.map((line, i) => (
                    <div key={i} className="flex px-4 hover:bg-surface-2/60">
                      <span aria-hidden="true" className="mr-5 w-5 shrink-0 text-right text-subtle/60 select-none">
                        {i + 1}
                      </span>
                      <span className="whitespace-pre text-fg">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
