# Westshore Land Sales — Static Site

Plain HTML/CSS/JS marketing site. No build step, no framework. Clean URLs via
`vercel.json`. The blog is a git-backed CMS (Decap) — see below.

Real marketing copy is in place throughout. Contact details, prices, and
gallery photos are placeholders pending client content.

## Pages

```
index.html                     Home / lander
developer.html                 About the developer (About, Our Commitment,
                               Our Communities)
blog.html                      Blog listing — auto-generated post grid
financing.html                 Financing category breakdown
community-westshore-pines.html Blue Springs Ranch community page (URL kept
                               from the retired Westshore Pines Ranches page)
css/styles.css                 All styling + design tokens (top of file)
js/main.js                     Contact-form submit (Formspree) + mobile nav
images/                        hero-river.webp, hero-lake.webp
vercel.json                    Clean-URL config + /admin OAuth rewrites
admin/                         Decap CMS (content editor UI)
api/                           GitHub OAuth provider for Decap (Vercel functions)
content/posts/                 Blog posts as markdown (source of truth)
blog/                          Generated post pages — don't hand-edit
scripts/build-blog.js          Renders content/posts/*.md into blog/*.html
                               and refreshes blog.html + index.html grids
.github/workflows/build-blog.yml  Runs the script whenever a post is published
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
   `/financing`, etc.).

## Blog (Decap CMS)

Posts are written through a browser-based editor at `/admin` (no code, no git
knowledge needed day-to-day) and stored as markdown files in
`content/posts/*.md` — that folder is the source of truth. Publishing a post
there triggers `.github/workflows/build-blog.yml`, which runs
`scripts/build-blog.js` to:

1. Render each post to a static page at `blog/<slug>.html`.
2. Refresh the post grid in `blog.html` (all posts) and the teaser section in
   `index.html` (latest 3), between the `<!-- BLOG-POSTS:START/END -->` and
   `<!-- BLOG-TEASER:START/END -->` marker comments — don't hand-edit inside
   those markers, they get overwritten on the next build.

Because everything is committed back as plain static HTML, there's no
client-side fetch and no runtime dependency on a CMS API — good for SEO and
consistent with the rest of the site having no build step at request time.

### One-time setup (not done yet)

Decap's `github` backend needs an OAuth app so the `/admin` login works:

1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
   Homepage URL: `https://westshore-site.vercel.app`. Authorization callback
   URL: `https://westshore-site.vercel.app/callback`.
2. In Vercel project settings, add environment variables
   `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET` from that OAuth
   app, then redeploy.
3. If a custom domain is added later, update the OAuth app's homepage/callback
   URL (GitHub OAuth Apps support only one callback URL) and `base_url` in
   `admin/config.yml` to match.

## Contact form

Fields: first name, last name, email, phone, and a "Community interested in"
dropdown (Blue Springs Ranch / Not sure yet), plus the SMS/email consent line. Submits via `fetch` to Formspree
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
- Complete the Decap CMS OAuth setup (see "Blog" section above) so `/admin`
  login works.
