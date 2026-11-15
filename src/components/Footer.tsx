import { navItems, profile, socials } from "@/data/portfolio";
import { CurrentYear } from "./CurrentYear";
import { SocialIcon } from "./icons";

export function Footer() {
  const links = socials.filter((s) => s.key !== "phone");
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#home" className="font-mono text-sm text-fg">
              <span className="text-muted">~/</span>jaseem<span className="text-blue">.c</span>
            </a>
            <p className="mt-3 text-sm text-fg">{profile.name}</p>
            <p className="text-sm text-muted">{profile.title} · {profile.location}</p>
            <p className="mt-4 font-mono text-xs text-subtle">
              <span className="text-green">{"// "}</span>Built with code and curiosity.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mb-3 font-mono text-xs text-subtle">navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4 md:grid-cols-2">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="font-mono text-sm text-muted transition-colors hover:text-fg">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 font-mono text-xs text-subtle">connect</p>
            <ul className="flex gap-2">
              {links.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={s.label}
                    title={s.label}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <SocialIcon name={s.key} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {profile.name}. All rights reserved.
          </p>
          <p>
            <span className="text-green">●</span> Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
