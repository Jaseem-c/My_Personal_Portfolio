"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      // The active section is the last one whose top has passed ~35% of the viewport.
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0];
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id;
      }
      // At the very bottom, highlight the last section.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        open
          ? "border-line bg-bg/95 backdrop-blur-xl"
          : scrolled
          ? "border-line bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          className="group flex items-center gap-2 font-mono text-sm font-medium text-fg"
          aria-label="Jaseem C — back to top"
        >
          <span className="flex size-7 items-center justify-center rounded-md border border-line-strong bg-surface-2 text-xs text-green">
            {"{J}"}
          </span>
          <span>
            <span className="text-muted">~/</span>jaseem
            <span className="text-blue">.c</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 font-mono text-[13px] transition-colors",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md border border-line bg-surface-2"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className={cn("mr-0.5", isActive ? "text-green" : "text-subtle")}>./</span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.cvUrl}
            download={profile.cvFileName}
            className="hidden items-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-3.5 py-2 font-mono text-[13px] text-fg transition-colors hover:border-blue/60 hover:text-blue sm:inline-flex"
          >
            <Download size={14} aria-hidden="true" />
            cv.pdf
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-fg lg:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence
        onExitComplete={() => {
          const id = pendingScroll.current;
          pendingScroll.current = null;
          if (!id) return;
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", `#${id}`);
        }}
      >
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
              {navItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      // Close the menu first; scroll after its exit animation (see onExitComplete).
                      e.preventDefault();
                      pendingScroll.current = item.id;
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-3 font-mono text-sm",
                      active === item.id ? "bg-surface-2 text-fg" : "text-muted",
                    )}
                  >
                    <span className="text-subtle">{String(i).padStart(2, "0")}</span>
                    <span className="text-green">./</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-3 border-t border-line pt-4">
                <a
                  href={profile.cvUrl}
                  download={profile.cvFileName}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2 px-4 py-3 font-mono text-sm text-fg"
                >
                  <Download size={15} aria-hidden="true" />
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
