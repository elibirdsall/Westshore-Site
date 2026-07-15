const SITE_URL = "https://westshore-land-sales.vercel.app"; // TODO: client's domain

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
