import Link from "next/link";
import { posts, formatDate } from "../../lib/posts";

export const metadata = {
  title: "Land Buying Blog",
  description:
    "Guides on buying, financing, and owning rural land in Florida — surveys, warranty deeds, land loans, and more from Westshore Land Sales.",
};

export default function BlogIndex() {
  return (
    <>
      <div className="page-head on-dark">
        <div className="wrap">
          <span className="eyebrow">Field Notes</span>
          <h1 className="display">The Land Buying Blog</h1>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="post-grid">
            {posts.map((p) => (
              <article className="post-card" key={p.slug}>
                <span className="eyebrow">{p.tag}</span>
                <h3 className="display">
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h3>
                <span className="post-meta">
                  {formatDate(p.date)} · {p.readMinutes} min read
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
