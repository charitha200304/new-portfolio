# Charitha Chiranjeewa — Portfolio

A single-page, dark-themed bento-grid portfolio built on the Next.js App
Router, with smooth scroll-spy navigation between sections and a working
contact form powered by Resend.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion** — scroll reveals, hover glows, active-nav-pill animation
- **Resend** — contact form email delivery
- **lucide-react** — icons

## Getting started

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
RESEND_API_KEY=your_resend_api_key
```

Get a free key at [resend.com/api-keys](https://resend.com/api-keys). While
your domain is unverified with Resend, the `from` address must stay
`onboarding@resend.dev` (already set in `app/api/send/route.js`), and Resend
will only deliver to the email address on your own Resend account until you
verify a sending domain.

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
app/
  layout.js               → root layout, SEO metadata + Open Graph tags
  page.js                  → homepage, assembles Nav + bento grid sections
  globals.css              → Tailwind directives, scroll-margin offsets, theme
  api/
    send/route.js           → POST endpoint, emails submissions to Charitha via Resend
components/
  BentoCard.js               → shared glass-card wrapper (reveal + hover glow)
  Nav.js                      → sticky nav bar with scroll-spy active-section pill
  Hero.js                      → headline, profile photo, location badge, social links
  ExperienceEducation.js        → RedCode Solutions role + IJSE education
  Projects.js                    → CraveCart, Daily Spend, C-MOBILES cards
  Skills.js                       → categorized glowing tech badges
  ContactForm.js                   → controlled form, posts to /api/send
public/
  profile.jpg                      → profile photo used in the Hero section
```

## Single-page navigation

All sections (`#home`, `#about`, `#projects`, `#skills`, `#contact`) live on
one page. `components/Nav.js` uses an `IntersectionObserver` to highlight the
active link as you scroll, and intercepts clicks to smooth-scroll instead of
jumping. `scroll-margin-top` in `globals.css` keeps the sticky nav from
covering the top of each section when it's scrolled into view.

## Customizing content

- Swap `public/profile.jpg` for a higher-resolution photo if you have one.
- Update social links in `components/Hero.js` (GitHub, LinkedIn) if the
  handles change.
- Add real project links (`href`) in `components/Projects.js` once live URLs
  exist for CraveCart, Daily Spend, and C-MOBILES.
- Add a real `favicon.ico`, `apple-touch-icon.png`, and `og-image.png`
  (1200×630) to `public/` for a proper social-sharing preview, and update
  `SITE_URL` in `app/layout.js` once a domain is chosen.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the `RESEND_API_KEY` environment variable in the Vercel project
   settings.
4. Deploy — no additional build configuration needed.
