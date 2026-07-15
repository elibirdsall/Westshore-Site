import { posts } from "../lib/posts";

const SITE_URL = "https://westshore-land-sales.vercel.app"; // TODO: client's domain

export default function sitemap() {
  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), priority: 0.8 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.7,
    })),
  ];
}
