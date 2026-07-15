import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: "center", maxWidth: 560 }}>
        <span className="eyebrow">Off the plat</span>
        <h1 className="display" style={{ fontSize: "3rem", margin: "12px 0 16px" }}>
          Page not found
        </h1>
        <p style={{ marginBottom: 24 }}>
          This parcel isn&rsquo;t on our map. Head back to the homepage to
          explore available communities.
        </p>
        <Link className="btn btn-pine" href="/">Back to home</Link>
      </div>
    </section>
  );
}
