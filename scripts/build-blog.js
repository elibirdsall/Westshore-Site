// Renders content/posts/*.md into static blog pages, and refreshes the
// post grids in blog.html and index.html. Run by .github/workflows/build-blog.yml
// whenever a post is published through the /admin CMS.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ROOT = path.join(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const BLOG_OUT_DIR = path.join(ROOT, "blog");
const BLOG_HTML = path.join(ROOT, "blog.html");
const INDEX_HTML = path.join(ROOT, "index.html");

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function formatDate(d) {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.md$/, "");
      const words = content.trim().split(/\s+/).filter(Boolean).length;
      const readMinutes = Math.max(1, Math.round(words / 200));
      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date) : new Date(),
        category: data.category || "Buying Guides",
        excerpt: data.excerpt || "",
        featuredImage: data.featured_image || "",
        bodyHtml: marked.parse(content),
        readMinutes,
      };
    })
    .sort((a, b) => b.date - a.date);
}

const SITE_HEAD = (title, description) => `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} — Westshore Land Sales</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700&family=IBM+Plex+Mono:wght@400;500;700&family=Newsreader:ital@0;1&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/css/styles.css" />`;

const SITE_HEADER = `<header class="site-header">
  <div class="wrap">
    <a href="/" class="brand">
      <span class="brand-mark display">Westshore</span>
      <span class="brand-sub">Land Sales · Florida</span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav">
      <span class="nav-toggle-bar"></span>
      <span class="nav-toggle-bar"></span>
      <span class="nav-toggle-bar"></span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <a class="nav-link" href="/#communities">Communities</a>
      <a class="nav-link" href="/#why">Why Florida</a>
      <a class="nav-link" href="/#financing">Financing</a>
      <div class="nav-item nav-has-dropdown">
        <a class="nav-link nav-trigger" href="/developer">Developer <span class="caret" aria-hidden="true">▾</span></a>
        <div class="dropdown">
          <div class="dropdown-inner">
            <a href="/developer#about">About the Developer</a>
            <a href="/developer#we-buy-land">We Buy Land</a>
            <a href="/developer#commitment">Our Commitment</a>
            <a href="/developer#success-stories">Success Stories</a>
          </div>
        </div>
      </div>
      <a class="nav-link" href="/blog">Blog</a>
      <a class="btn btn-orange" href="/#contact">Request Info</a>
    </nav>
  </div>
</header>`;

const SITE_FOOTER = `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-brand display">Westshore Land Sales</div>
        <p class="footer-blurb">High-quality Florida land for sale — waterfront, recreational, investment, and homesite properties selected for lasting value.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="/#communities">Communities</a></li>
          <li><a href="/community-westshore-pines">Westshore Pines Ranches</a></li>
          <li><a href="/community-cypress-bend">Cypress Bend</a></li>
          <li><a href="/developer">About the Developer</a></li>
          <li><a href="/blog">Land Buying Blog</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:8004447355">(800) 444-SELL</a></li>
          <li><a href="mailto:info@example.com">info@example.com</a></li>
          <li><a href="/#contact">Request property info</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-legal">© 2026 Westshore Land Sales. All rights reserved. · Demo site — contact details and imagery are placeholders pending client content.</div>
  </div>
</footer>`;

function renderPostPage(post) {
  return `<!doctype html>
<html lang="en">
<head>
${SITE_HEAD(post.title, post.excerpt || post.title)}
</head>
<body>

${SITE_HEADER}

<main>
<div class="page-head on-dark">
  <div class="wrap">
    <span class="eyebrow">${escapeHtml(post.category)}</span>
    <h1 class="display">${escapeHtml(post.title)}</h1>
  </div>
</div>

${post.featuredImage ? `<div class="post-hero"><img src="${escapeHtml(post.featuredImage)}" alt="${escapeHtml(post.title)}" /></div>\n\n` : ""}<section class="section">
  <div class="wrap">
    <p class="post-meta" style="margin-bottom:28px">${formatDate(post.date)} · ${post.readMinutes} min read</p>
    <div class="post-body">
${post.bodyHtml}
    </div>
    <p style="margin-top:40px"><a class="btn btn-teal" href="/blog">← Back to all posts</a></p>
  </div>
</section>
</main>

${SITE_FOOTER}

<script src="/js/main.js"></script>
</body>
</html>
`;
}

function renderCard(post) {
  const media = post.featuredImage
    ? `        <div class="post-card-media"><img src="${escapeHtml(post.featuredImage)}" alt="${escapeHtml(post.title)}" loading="lazy" /></div>\n`
    : "";
  return `      <article class="post-card">
${media}        <div class="post-card-body">
        <span class="eyebrow">${escapeHtml(post.category)}</span>
        <h3 class="display"><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <span class="post-meta">${formatDate(post.date)} · ${post.readMinutes} min read</span>
        </div>
      </article>`;
}

function replaceBetweenMarkers(html, startMarker, endMarker, replacement) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error(`Markers "${startMarker}" / "${endMarker}" not found`);
  }
  return html.slice(0, start + startMarker.length) + "\n" + replacement + "\n    " + html.slice(end);
}

function main() {
  const posts = readPosts();

  fs.mkdirSync(BLOG_OUT_DIR, { recursive: true });
  for (const f of fs.readdirSync(BLOG_OUT_DIR)) {
    if (f.endsWith(".html")) fs.unlinkSync(path.join(BLOG_OUT_DIR, f));
  }
  for (const post of posts) {
    fs.writeFileSync(path.join(BLOG_OUT_DIR, `${post.slug}.html`), renderPostPage(post));
  }

  const noPosts = "      <p>No posts yet — check back soon.</p>";

  let blogHtml = fs.readFileSync(BLOG_HTML, "utf8");
  const allCards = posts.map(renderCard).join("\n");
  blogHtml = replaceBetweenMarkers(
    blogHtml,
    "<!-- BLOG-POSTS:START -->",
    "<!-- BLOG-POSTS:END -->",
    allCards || noPosts
  );
  fs.writeFileSync(BLOG_HTML, blogHtml);

  let indexHtml = fs.readFileSync(INDEX_HTML, "utf8");
  const teaserCards = posts.slice(0, 3).map(renderCard).join("\n");
  indexHtml = replaceBetweenMarkers(
    indexHtml,
    "<!-- BLOG-TEASER:START -->",
    "<!-- BLOG-TEASER:END -->",
    teaserCards || noPosts
  );
  fs.writeFileSync(INDEX_HTML, indexHtml);

  console.log(`Rendered ${posts.length} post(s).`);
}

main();
