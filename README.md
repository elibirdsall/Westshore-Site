# Westshore Land Sales — Static Site

A plain HTML/CSS/JS marketing site. No build step, no framework, no Node.js
required. Blog is intended to be powered by **Sanity** (see below).

**This is a client demo.** All body copy is lorem ipsum; phone numbers, prices,
stats, and the hero video are placeholders. Titles and section labels are real.

## Files

```
index.html        Home / lander (Ken Burns hero, communities, why FL,
                  land package, financing, contact form, blog teaser)
developer.html    About-the-developer page (About, We Buy Land,
                  Our Commitment, Success Stories — one scrolling page)
blog.html         Blog listing placeholder — wire to Sanity
css/styles.css    All styling + design tokens (colors/fonts at the top)
js/main.js        Contact-form demo submit + mobile nav toggle
images/           hero-river.webp, hero-lake.webp
```

## View locally

Just double-click `index.html` — it opens in any browser. (Google Fonts load
over the network; everything else is local.)

## Deploy to Vercel

1. Push this folder to a GitHub repo:
   ```bash
   git init && git add -A && git commit -m "Westshore static demo"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Import the repo at [vercel.com/new](https://vercel.com/new) and click
   **Deploy**. Vercel serves the HTML as-is — **Framework Preset: Other**, no
   build command, no output directory needed. `index.html` is served at `/`.

Optional: to serve clean URLs (`/developer` instead of `/developer.html`), add a
`vercel.json` with `{ "cleanUrls": true }`. Links in this site use the `.html`
suffix so they also work when opening files directly, which is the safest
default for a demo.

## Wiring the blog to Sanity

`blog.html` (and the teaser on `index.html`) contain placeholder `.post-card`
markup with a comment marking the integration point. Two common paths:

- **Build-time (recommended):** use a static generator like Astro or Eleventy
  with `@sanity/client` to pull posts and render cards at deploy. Vercel runs the
  build; output stays static and fast.
- **Client-side:** fetch from Sanity's API on page load and inject cards into the
  `.post-grid`. Simplest to bolt on, but posts aren't in the initial HTML (weaker
  for SEO — a tradeoff worth noting given the SEO goal).

Either way, keep the existing `.post-card` / `.post-grid` classes so the styling
carries over.

## Before going live

- Swap the hero photos in `images/` (keep the filenames) or edit the
  `.hero-slide` blocks in `index.html` to add more.
- Replace the video placeholder in `index.html` with the client's embed.
- Point the contact form at a real handler — Formspree, Basin, or similar. In
  `index.html` set the `<form>` `action`/`method`, then remove the demo submit in
  `js/main.js`.
- Replace lorem ipsum copy, phone number, prices, and market stats.
- Swap the success-story and About photos for real past-community images.

## Design notes (for the client pitch)

- Palette from the land: pine green, sand, river blue, with a brass-gold action
  color drawn from the harvested fields and pine bark in the hero photos.
- Recurring survey/plat motif — dashed boundaries, corner markers, and
  section-township-range labels — reinforces "surveyed, titled, ready to build."
- Fonts: Big Shoulders Display (headlines), Newsreader (body), IBM Plex Mono
  (survey labels), loaded from Google Fonts.
- The Ken Burns hero respects `prefers-reduced-motion` (freezes on the first
  photo for users who opt out of animation).
