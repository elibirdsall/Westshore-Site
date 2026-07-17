# Westshore Land Sales — Static Site

Plain HTML/CSS/JS marketing site. No build step, no framework. Clean URLs via
`vercel.json`. Blog is intended to be powered by **Sanity**.

Real marketing copy is in place throughout. The only placeholder text is the
blog previews (to be replaced by Sanity). Contact details, prices, the "[XX+]
years" figure, and gallery photos are placeholders pending client content.

## Pages

```
index.html                     Home / lander
developer.html                 About the developer (About, We Buy Land,
                               Our Commitment, Success Stories)
blog.html                      Blog listing — wire to Sanity
community-westshore-pines.html Community page 1
community-cypress-bend.html    Community page 2
css/styles.css                 All styling + design tokens (top of file)
js/main.js                     Contact-form demo submit + mobile nav toggle
images/                        hero-river.webp, hero-lake.webp
vercel.json                    Clean-URL config
```

Each community page is: hero → contact form (top) → community details →
property photo gallery (bottom).

## View locally

Double-click `index.html`. (Locally, links use clean paths that Vercel resolves;
to test exactly as deployed, run `npx serve .` from this folder.)

## Deploy to Vercel

1. Push this folder to a GitHub repo:
   ```bash
   git init && git add -A && git commit -m "Westshore static site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Import at [vercel.com/new](https://vercel.com/new), Framework Preset **Other**,
   no build command. `vercel.json` enables clean URLs (`/developer`, `/blog`,
   `/community-cypress-bend`, etc.).

## Blog + Sanity

`blog.html` and the homepage teaser use `.post-card` markup with a comment
marking the integration point. Recommended: a build-time pull (Astro/Eleventy +
`@sanity/client`) so posts render into static HTML — best for the SEO goal.
Alternatively fetch client-side on load. Keep the existing card classes.

## Contact form

Fields: first name, last name, email, phone, and a "Community interested in"
dropdown (Westshore Pines Ranches / Cypress Bend / Both communities / Not sure
yet), plus the SMS/email consent line. Submits via `fetch` to Formspree
(`https://formspree.io/f/mzdneqje`), handled in `js/main.js`; the `<form>`
also carries a matching `action`/`method` as a no-JS fallback. Each page sets
a `_subject` hidden field so replies from Formspree are easy to tell apart.

## Design

Red / white / blue theme: navy is dominant, generous white space, and **red is
used only as an accent** — primary call-to-action buttons, the eyebrow ticks,
survey markers, star bullets, and status tags. Blue carries links and labels.
Fonts: Big Shoulders Display, Newsreader, IBM Plex Mono (Google Fonts). The
Ken Burns hero respects `prefers-reduced-motion`.

## Before going live

- Swap hero + gallery photos in `images/` (keep filenames) or add `.gallery-tile`
  entries; replace placeholder gallery tiles with real property photos.
- Replace the video placeholder in `index.html`.
- Fill in phone number, email, prices, and the "[XX+] years" figure.
- Wire the Sanity blog.
