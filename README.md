# Jaseem C — Portfolio

Personal portfolio of **Jaseem C**, Software Engineer (Backend & AI Applications).

🌐 **Live:** [jaseemc.online](https://jaseemc.online)

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and Lucide.

## Quick start

Requires **Node.js 20.9+** (22 LTS recommended).

```bash
npm install
cp .env.example .env.local   # optional — see "Contact form" below
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm start                    # serves the production build on :3000
npm run lint
```

## Editing content

All text lives in **`src/data/portfolio.ts`** — profile, experience, skills, projects, education and contact links. Change it there and every section updates.

| What | Where |
| --- | --- |
| Profile photo | `public/images/profile.jpg` (4:5 crop) |
| CV (Download CV buttons) | `public/documents/Jaseem_C_CV.pdf` |
| Favicon / app icon | `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png` |
| Social preview image | `src/app/opengraph-image.tsx` (generated at request time) |
| Colours & theme tokens | `src/app/globals.css` |

**Adding a project link:** projects are shown as *Private / Professional project* because their source isn't public. If you publish a repo or demo, add `repoUrl` and/or `liveUrl` to that project in `portfolio.ts` — the card will show **Code** / **Live** links automatically.

## Project structure

```
src/
  app/
    layout.tsx            # fonts, SEO/Open Graph metadata, JSON-LD, theme script
    page.tsx              # section order
    not-found.tsx         # custom 404
    api/contact/route.ts  # contact form endpoint (Resend)
    opengraph-image.tsx, robots.ts, sitemap.ts, icon.svg
  components/             # Navbar, Hero, Terminal, About, Experience, Skills,
                          # Projects, Education, Contact, Footer, ThemeToggle, ui, icons
  data/portfolio.ts       # all content
  lib/utils.ts
  types/index.ts
```

## Contact form

The form validates input in the browser and on the server (`/api/contact`) and sends email through [Resend](https://resend.com).

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes, to send | API key from Resend → API Keys |
| `CONTACT_TO_EMAIL` | no | Inbox that receives messages (default `seamjaseem@gmail.com`) |
| `CONTACT_FROM_EMAIL` | no | Sender address (default `Portfolio Contact <onboarding@resend.dev>`) |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for SEO/Open Graph (e.g. `https://jaseemc.dev`) |

Setup:

1. Create a free account at resend.com **using `seamjaseem@gmail.com`**.
2. Create an API key and set `RESEND_API_KEY` (locally in `.env.local`, on Vercel under *Settings → Environment Variables*).
3. The default sender `onboarding@resend.dev` only delivers to the email you signed up with — fine for receiving your own contact messages. Once you own a domain, verify it in Resend (*Domains*) and set `CONTACT_FROM_EMAIL="Portfolio <hello@your-domain.com>"`.

**Until a key is set**, submitting the form shows a clear "email service not configured" message with a one-click button that opens the visitor's email client with their message pre-filled — the form never pretends to have sent anything.

## Deploying to Vercel

1. Push this folder to a GitHub repository:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/jaseem-c/portfolio.git
   git push -u origin main
   ```
2. On [vercel.com/new](https://vercel.com/new), import the repository. The framework (Next.js) is detected automatically — no build settings to change.
3. Add the environment variables above under *Environment Variables*, then **Deploy**.
4. Every push to `main` redeploys automatically.

### Custom domain

1. In the Vercel project: *Settings → Domains → Add* and enter your domain (e.g. `jaseemc.dev` and `www.jaseemc.dev`).
2. At your domain registrar, add the DNS records Vercel shows — usually:
   - apex domain: `A` record → `76.76.21.21`
   - `www`: `CNAME` → `cname.vercel-dns.com`

   (Or switch the domain's nameservers to Vercel's.)
3. Wait for verification (minutes to a few hours). HTTPS is issued automatically.
4. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` and redeploy so metadata, sitemap and Open Graph use the custom domain.

## Notes

- Dark theme is the default; the light theme choice is remembered in `localStorage` and applied before first paint (no flash).
- Animations respect the visitor's *reduce motion* setting.
- Fonts (Geist / Geist Mono) are self-hosted via the `geist` package — no external font requests.
- Technology logos come from [Simple Icons](https://simpleicons.org) (CC0).
