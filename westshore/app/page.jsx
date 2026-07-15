import Link from "next/link";
import ContactForm from "../components/ContactForm";
import { posts, formatDate } from "../lib/posts";

export const metadata = {
  title: "Westshore Land Sales — Florida Gulf Coast Land for Sale",
};

/* Decorative plat-map linework for the hero background */
function PlatLines() {
  return (
    <svg
      className="hero-plat"
      aria-hidden="true"
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="rgba(241,237,224,0.16)" strokeWidth="1">
        <path d="M-40 520 L340 380 L560 470 L920 300 L1260 380" strokeDasharray="7 7" />
        <path d="M120 -40 L260 260 L340 380" strokeDasharray="7 7" />
        <path d="M920 300 L1010 -40" strokeDasharray="7 7" />
        <path d="M560 470 L610 700" strokeDasharray="7 7" />
        <path d="M-40 200 C 240 260, 420 140, 760 190 S 1160 120, 1260 160" stroke="rgba(160,196,205,0.28)" strokeWidth="2" />
      </g>
      <g fill="#e85c1d">
        <path d="M340 380 l-6 0 l6 -14 l6 14 z" />
        <circle cx="560" cy="470" r="4" />
        <circle cx="920" cy="300" r="4" />
      </g>
      <g
        fill="rgba(241,237,224,0.35)"
        fontFamily="monospace"
        fontSize="11"
        letterSpacing="2"
      >
        <text x="380" y="360">N 42°17′ E</text>
        <text x="700" y="410">661.20′</text>
        <text x="960" y="280">PARCEL 14-A</text>
      </g>
    </svg>
  );
}

function CornerMark({ pos }) {
  return (
    <svg className={`corner ${pos}`} viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 0 V14 M0 7 H14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const communities = [
  {
    no: "TRACT 01 · SEC 14-29S-17E",
    name: "Westshore Pines Ranches",
    meta: ["— acres", "From $—"],
  },
  {
    no: "TRACT 02 · SEC 08-28S-16E",
    name: "Cypress Bend",
    meta: ["— acres", "From $—"],
  },
  {
    no: "TRACT 03 · SEC 22-30S-18E",
    name: "Sandhill Trail",
    meta: ["— acres", "From $—"],
  },
];

const financing = [
  "Land Loans",
  "401(k)",
  "Self-Directed IRA",
  "HELOC",
  "Cash",
];

export default function Home() {
  const latest = posts.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="hero on-dark">
        <PlatLines />
        <div className="wrap">
          <div>
            <span className="eyebrow">Florida Gulf Coast</span>
            <h1 className="display">
              Own your piece of the <em>Gulf Coast</em>
            </h1>
            <div className="hero-ctas">
              <a className="btn btn-flag" href="#contact">
                Request Property Info
              </a>
              <a className="btn btn-ghost" href="#communities">
                Explore Communities
              </a>
            </div>
            <p className="hero-phone">
              Speak with a land consultant:{" "}
              <a href="tel:8005550134">(800) 555-0134</a>
            </p>
          </div>

          <div className="video-frame">
            <CornerMark pos="tl" />
            <CornerMark pos="tr" />
            <CornerMark pos="bl" />
            <CornerMark pos="br" />
            {/* Replace this block with the client's video embed (YouTube/Vimeo/MP4) */}
            <div className="video-inner">
              <button className="play-btn" aria-label="Play video (placeholder)">
                ▶
              </button>
              <p>Client video placeholder · 16:10</p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- COMMUNITIES */}
      <section className="section" id="communities">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Explore our communities</span>
            <h2 className="display">Exceptional land, staked and surveyed</h2>
          </div>
          <div className="parcel-grid">
            {communities.map((c) => (
              <article className="parcel" key={c.name}>
                <span className="parcel-no">{c.no}</span>
                <h3 className="display">{c.name}</h3>
                <div className="parcel-meta">
                  <span>{c.meta[0]}</span>
                  <span>{c.meta[1]}</span>
                </div>
                <a href="#contact">More info →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- WHY */}
      <section className="section why on-dark" id="why">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Location</span>
            <h2 className="display">An exciting place to own land</h2>
          </div>
          <div className="why-grid">
            <div className="why-cell">
              <div className="stat display">0%</div>
              <h3>State income tax</h3>
            </div>
            <div className="why-cell">
              <div className="stat display">—</div>
              <h3>Market stat</h3>
            </div>
            <div className="why-cell">
              <div className="stat display">—</div>
              <h3>Market stat</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- LAND PACKAGE */}
      <section className="section" id="package">
        <div className="wrap package-grid">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">How to purchase</span>
            <h2 className="display">The complete land package</h2>
            <p style={{ marginTop: 14 }}>
              <a className="btn btn-pine" href="#contact">
                Ask about a property
              </a>
            </p>
          </div>
          <div className="deed">
            <div className="deed-head">Included with every property</div>
            <ul>
              <li>A registered and certified survey</li>
              <li>Title work</li>
              <li>Great financing</li>
              <li>A warranty deed with protections written into the deed</li>
              <li>Approvals from local, state, and federal agencies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- FINANCING */}
      <section className="section" id="financing" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Offering excellent financing</span>
            <h2 className="display">Five ways to fund your land</h2>
          </div>
          <div className="fin-list">
            {financing.map((name) => (
              <div className="fin-item" key={name}>
                <h3 className="display">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CONTACT */}
      <section className="section contact" id="contact">
        <div className="wrap contact-grid">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Get in touch</span>
            <h2 className="display">Speak with a land consultant</h2>
            <p className="hero-phone" style={{ marginTop: 18 }}>
              Prefer to talk? <a href="tel:8005550134">(800) 555-0134</a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ---------------------------------------------------------- BLOG */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">From the land buying blog</span>
            <h2 className="display">Know before you buy</h2>
          </div>
          <div className="post-grid">
            {latest.map((p) => (
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
