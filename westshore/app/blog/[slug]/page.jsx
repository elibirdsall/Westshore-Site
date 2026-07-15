import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate } from "../../../lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="article">
      <Link className="article-back" href="/blog">
        ← All articles
      </Link>
      <div style={{ marginTop: 28 }}>
        <span className="eyebrow">{post.tag}</span>
      </div>
      <h1 className="display">{post.title}</h1>
      <span className="post-meta">
        {formatDate(post.date)} · {post.readMinutes} min read
      </span>

      {post.body.map((block, i) =>
        block.type === "h2" ? (
          <h2 className="display" key={i}>
            {block.text}
          </h2>
        ) : (
          <p key={i}>{block.text}</p>
        )
      )}

      <div className="article-cta">
        <strong>Ready to walk a property?</strong>
        <Link className="btn btn-flag" href="/#contact">
          Request Property Info
        </Link>
      </div>
    </article>
  );
}
