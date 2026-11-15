"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TechIcon } from "./icons";

export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: { children: ReactNode; delay?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  index,
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  index: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-sm text-muted">
        <span className="text-subtle">{index}</span>
        <span className="text-green">{"//"}</span>
        <span className="text-fg">{label}</span>
        <span aria-hidden="true" className="h-px w-16 bg-line-strong" />
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}

export function TechBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-xs text-muted",
        className,
      )}
    >
      <TechIcon name={name} size={12} />
      {name}
    </span>
  );
}

export function WindowDots({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex items-center gap-1.5", className)}>
      <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
      <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
      <span className="size-2.5 rounded-full bg-[#28c840]/80" />
    </span>
  );
}
