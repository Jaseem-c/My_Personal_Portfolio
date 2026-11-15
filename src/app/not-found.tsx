import type { Metadata } from "next";
import Link from "next/link";
import { WindowDots } from "@/components/ui";

export const metadata: Metadata = {
  title: "404 — Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-16">
      <div aria-hidden="true" className="bg-grid mask-fade pointer-events-none absolute inset-0" />
      <div className="relative w-full max-w-xl">
        <p className="mb-6 text-center font-mono text-7xl font-semibold tracking-tight text-fg sm:text-8xl">
          4<span className="text-blue">0</span>4
        </p>
        <div className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
            <WindowDots />
            <span className="font-mono text-[11px] text-subtle">jaseem@dubai: ~</span>
          </div>
          <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
            <p>
              <span className="text-green">$</span> <span className="text-fg">cd ./requested-page</span>
            </p>
            <p className="text-pink">bash: cd: ./requested-page: No such file or directory</p>
            <p>
              <span className="text-green">$</span> <span className="text-subtle">{"# the page you're looking for doesn't exist or was moved"}</span>
            </p>
            <p>
              <span className="text-green">$</span> <span className="caret text-muted" />
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            cd ~ (Back to home)
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-blue/60"
          >
            Contact me
          </Link>
        </div>
      </div>
    </main>
  );
}
