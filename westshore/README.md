# Westshore Land Sales — Demo Site

A templated marketing site for a Florida Gulf Coast land developer. One-page lander + SEO blog, built with Next.js (App Router) and deployable to Vercel in a couple of clicks.

**This is a client demo.** All copy, phone numbers, prices, stats, and the hero video are placeholders — search the code for `[Placeholder]` and `TODO`.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repo:
   ```bash
   git init && git add -A && git commit -m "Westshore demo"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. No configuration needed — Vercel auto-detects Next.js.

## Structure

```
app/
  layout.jsx          Header, footer, fonts, site-wide SEO metadata
  page.jsx            The one-page lander (hero/video, communities, why FL,
                      land package, financing, contact form, blog teaser)
  globals.css         All styling + design tokens (colors/type at the top)
  blog/page.jsx       Blog index
  blog/[slug]/page.jsx  Article template (per-post SEO metadata)
  sitemap.js          Auto-generated sitemap.xml (SEO)
  robots.js           robots.txt
components/ContactForm.jsx   Demo form — fakes a submit; wire to email/CRM later
lib/posts.js          Blog posts as plain data (3 placeholder SEO articles)
```

## Before going live

- Replace the video placeholder in `app/page.jsx` (marked with a comment) with the client's YouTube/Vimeo embed or an MP4.
- Swap `SITE_URL` in `app/layout.jsx`, `app/sitemap.js`, and `app/robots.js` for the real domain.
- Wire `components/ContactForm.jsx` to a real destination (Vercel serverless route + Resend, Formspree, or the client's CRM).
- Replace placeholder copy, phone number, prices, and market stats.
- For a real blog workflow, migrate `lib/posts.js` to MDX files or a headless CMS — the templates won't need to change much.

## Design notes (for the client pitch)

- Palette pulled from the land itself: pine green, sand, river blue — with surveyor's flagging-tape orange as the action color.
- The recurring motif is the survey/plat map: dashed parcel boundaries, corner markers, and section-township-range labels. It signals the product's core promise — every property is surveyed, titled, and ready to build.
- Type: Big Shoulders Display (headlines), Newsreader (body), IBM Plex Mono (survey labels). All load via `next/font` — self-hosted, zero layout shift, good for Core Web Vitals.
