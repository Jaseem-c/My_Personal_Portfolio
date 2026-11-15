"use client";

import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile, socials } from "@/data/portfolio";
import { cn, EMAIL_RE } from "@/lib/utils";
import { SocialIcon } from "./icons";
import { Reveal, SectionHeading, WindowDots } from "./ui";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success" }
  | { state: "error"; message: string; fallback: boolean };

const empty: Fields = { name: "", email: "", subject: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "That email address doesn't look right.";
  if (!f.subject.trim()) e.subject = "Please add a subject.";
  if (!f.message.trim()) e.message = "Please write a message.";
  else if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

const accent: Record<string, string> = {
  linkedin: "group-hover:text-[#0a66c2]",
  github: "group-hover:text-fg",
  email: "group-hover:text-orange",
  phone: "group-hover:text-green",
  whatsapp: "group-hover:text-[#25d366]",
};

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(
    `${fields.message}\n\n— ${fields.name}${fields.email ? ` (${fields.email})` : ""}`,
  )}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate(fields);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ state: "success" });
        setFields(empty);
        return;
      }
      if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        setStatus({ state: "error", message: data.error ?? "Please check the form.", fallback: false });
        return;
      }
      setStatus({
        state: "error",
        message:
          data.error === "not_configured"
            ? "The contact form isn't connected to an email service yet. Please send your message by email instead — your text is carried over."
            : "Something went wrong while sending. Please try again, or email me directly.",
        fallback: true,
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error — please check your connection, or email me directly.",
        fallback: true,
      });
    }
  }

  const inputCls = (err?: string) =>
    cn(
      "w-full rounded-lg border bg-bg px-3.5 py-2.5 text-[15px] text-fg placeholder:text-subtle transition-colors outline-none focus:border-blue focus:ring-2 focus:ring-blue/20",
      err ? "border-pink/70" : "border-line-strong",
    );

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden border-t border-line bg-bg-soft py-24 sm:py-32">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="06"
          label="contact_me"
          title={<span id="contact-heading">Let&apos;s Build Something Great Together.</span>}
          description="I'm always interested in connecting with engineers, recruiters, and teams working on interesting software engineering and AI applications."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 [&>*]:min-w-0">
          {/* contact methods */}
          <Reveal>
            <ul className="grid gap-3">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-all hover:border-line-strong hover:bg-surface-2"
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-muted transition-colors",
                        accent[s.key],
                      )}
                    >
                      <SocialIcon name={s.key} size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs text-subtle">{s.label.toLowerCase()}</span>
                      <span className="block truncate text-[15px] text-fg">{s.value}</span>
                    </span>
                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                      className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* form */}
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-xl shadow-black/15">
              <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
                <WindowDots />
                <span className="font-mono text-[11px] text-subtle">POST /api/contact</span>
              </div>

              <form noValidate onSubmit={onSubmit} className="space-y-4 p-5 sm:p-6" aria-describedby="form-status">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Full Name" error={errors.name}>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={fields.name}
                      onChange={update("name")}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      required
                      maxLength={100}
                      className={inputCls(errors.name)}
                    />
                  </Field>
                  <Field id="email" label="Email Address" error={errors.email}>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={update("email")}
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      required
                      maxLength={200}
                      className={inputCls(errors.email)}
                    />
                  </Field>
                </div>
                <Field id="subject" label="Subject" error={errors.subject}>
                  <input
                    id="contact-subject"
                    name="subject"
                    value={fields.subject}
                    onChange={update("subject")}
                    placeholder="What's this about?"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    required
                    maxLength={150}
                    className={inputCls(errors.subject)}
                  />
                </Field>
                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={fields.message}
                    onChange={update("message")}
                    placeholder="Tell me about the role, team or project…"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    required
                    maxLength={5000}
                    className={cn(inputCls(errors.message), "resize-y")}
                  />
                </Field>

                {/* honeypot (hidden from people and assistive tech) */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </div>

                <div id="form-status" aria-live="polite">
                  {status.state === "success" && (
                    <p className="flex items-start gap-2.5 rounded-lg border border-green/40 bg-green/10 px-4 py-3 text-sm text-fg">
                      <CheckCircle2 size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-green" />
                      Thanks — your message was sent. I&apos;ll get back to you soon.
                    </p>
                  )}
                  {status.state === "error" && (
                    <div className="rounded-lg border border-pink/40 bg-pink/10 px-4 py-3 text-sm text-fg">
                      <p className="flex items-start gap-2.5">
                        <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-pink" />
                        {status.message}
                      </p>
                      {status.fallback && (
                        <a
                          href={mailtoFallback}
                          className="mt-3 ml-7 inline-flex items-center gap-2 rounded-md border border-line-strong bg-surface px-3 py-1.5 font-mono text-xs text-fg hover:border-blue/60"
                        >
                          <Mail size={13} aria-hidden="true" /> Email {profile.email}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status.state === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                >
                  {status.state === "loading" ? (
                    <>
                      <Loader2 size={16} aria-hidden="true" className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} aria-hidden="true" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-1.5 block font-mono text-xs text-muted">
        {label} <span className="text-pink">*</span>
      </label>
      {children}
      {error && (
        <p id={`contact-${id}-error`} className="mt-1.5 text-xs text-pink">
          {error}
        </p>
      )}
    </div>
  );
}
