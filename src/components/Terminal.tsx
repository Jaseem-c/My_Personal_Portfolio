"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { WindowDots } from "./ui";

type Entry = { cmd: string; out: { text: string; tone?: "fg" | "muted" | "blue" | "violet" | "green" }[] };

const script: Entry[] = [
  {
    cmd: "whoami",
    out: [
      { text: "Jaseem C", tone: "fg" },
      { text: "Software Engineer · AI Application Engineer", tone: "muted" },
    ],
  },
  {
    cmd: "cat specialization.txt",
    out: [
      { text: "Backend Engineering", tone: "blue" },
      { text: "AI Application Development", tone: "violet" },
    ],
  },
  {
    cmd: "ls languages/",
    out: [{ text: "go/  python/  javascript/", tone: "green" }],
  },
];

const toneClass = {
  fg: "text-fg",
  muted: "text-muted",
  blue: "text-blue",
  violet: "text-violet",
  green: "text-green",
};

export function Terminal({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  // step = index of the entry being typed; chars = typed characters of that command.
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);
  const done = step >= script.length;

  useEffect(() => {
    if (done) return;
    // Reduced motion: skip the typing animation (done after hydration to keep SSR markup identical).
    if (reduce) {
      const t = setTimeout(() => setStep(script.length), 0);
      return () => clearTimeout(t);
    }
    const entry = script[step];
    if (chars < entry.cmd.length) {
      const t = setTimeout(() => setChars((c) => c + 1), chars === 0 ? 450 : 45);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep((s) => s + 1);
      setChars(0);
    }, 550);
    return () => clearTimeout(t);
  }, [step, chars, done, reduce]);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line-strong bg-surface/95 shadow-2xl shadow-black/30 backdrop-blur ${className}`}
      role="img"
      aria-label="Terminal: whoami — Jaseem C, Software Engineer. Specialization — Backend Engineering, AI Application Development. Languages — Go, Python, JavaScript."
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
        <WindowDots />
        <span className="font-mono text-[11px] text-subtle">jaseem@dubai: ~</span>
      </div>
      <div aria-hidden="true" className="min-h-[218px] space-y-3 p-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        {script.map((entry, i) => {
          if (!done && i > step) return null;
          const typing = !done && i === step;
          return (
            <div key={entry.cmd}>
              <p>
                <span className="text-green">$</span>{" "}
                <span className="text-fg">{typing ? entry.cmd.slice(0, chars) : entry.cmd}</span>
                {typing && <span className="caret ml-0.5 text-muted" />}
              </p>
              {!typing &&
                entry.out.map((o) => (
                  <p key={o.text} className={toneClass[o.tone ?? "muted"]}>
                    {o.text}
                  </p>
                ))}
            </div>
          );
        })}
        {done && (
          <p>
            <span className="text-green">$</span> <span className="caret text-muted" />
          </p>
        )}
      </div>
    </div>
  );
}
