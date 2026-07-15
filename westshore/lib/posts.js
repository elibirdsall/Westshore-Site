// ---------------------------------------------------------------------------
// DEMO CONTENT — Blog posts live here as plain data for now.
// Titles only; article copy to be provided by the client.
// Swap this out for a CMS (Sanity, Contentful) or MDX when the client signs.
// ---------------------------------------------------------------------------

const COPY_TO_COME = "Article copy to be provided.";

export const posts = [
  {
    slug: "how-to-buy-land-in-florida",
    title: "How to Buy Land in Florida: A Step-by-Step Guide",
    description: COPY_TO_COME,
    date: "2026-07-01",
    readMinutes: 7,
    tag: "Buying Guides",
    body: [{ type: "p", text: COPY_TO_COME }],
  },
  {
    slug: "land-loans-vs-cash",
    title: "Land Loans vs. Cash: 5 Ways to Finance Florida Acreage",
    description: COPY_TO_COME,
    date: "2026-06-18",
    readMinutes: 5,
    tag: "Financing",
    body: [{ type: "p", text: COPY_TO_COME }],
  },
  {
    slug: "what-is-a-land-package",
    title: "What Is a Land Package? Survey, Title, and Deed Explained",
    description: COPY_TO_COME,
    date: "2026-06-02",
    readMinutes: 6,
    tag: "Buying Guides",
    body: [{ type: "p", text: COPY_TO_COME }],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
