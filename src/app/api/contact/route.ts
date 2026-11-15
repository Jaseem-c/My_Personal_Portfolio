import { Resend } from "resend";
import { EMAIL_RE } from "@/lib/utils";

/**
 * Contact form endpoint.
 *
 * Required environment variables (see README / .env.example):
 *   RESEND_API_KEY       – API key from https://resend.com
 *   CONTACT_TO_EMAIL     – inbox that receives messages (defaults to seamjaseem@gmail.com)
 *   CONTACT_FROM_EMAIL   – verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *                          (defaults to Resend's test sender onboarding@resend.dev)
 *
 * Without RESEND_API_KEY the endpoint returns 503 and the UI offers a direct email fallback.
 */

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };

type Payload = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; company?: unknown };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "company" field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = "Enter a valid email address.";
  if (!subject) errors.subject = "Subject is required.";
  else if (subject.length > LIMITS.subject) errors.subject = "Subject is too long.";
  if (!message) errors.message = "Message is required.";
  else if (message.length < 10) errors.message = "Message should be at least 10 characters.";
  else if (message.length > LIMITS.message) errors.message = "Message is too long.";

  if (Object.keys(errors).length) {
    return Response.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "not_configured", message: "The email service is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || "seamjaseem@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 12px">New message from your portfolio</h2>
      <p><strong>Name:</strong> ${escape(name)}<br/><strong>Email:</strong> ${escape(email)}<br/><strong>Subject:</strong> ${escape(subject)}</p>
      <p style="white-space:pre-wrap">${escape(message)}</p>
    </div>`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return Response.json({ error: "send_failed", message: "Your message couldn't be sent." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
