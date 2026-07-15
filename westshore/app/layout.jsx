import "./globals.css";
import Link from "next/link";
import {
  Big_Shoulders_Display,
  Newsreader,
  IBM_Plex_Mono,
} from "next/font/google";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const body = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const SITE_URL = "https://westshore-land-sales.vercel.app"; // TODO: swap for the client's domain

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Westshore Land Sales — Florida Gulf Coast Land for Sale",
    template: "%s | Westshore Land Sales",
  },
  description:
    "Premium waterfront and large-acreage land for sale on Florida's Gulf Coast. Complete land packages with certified surveys, title work, and warranty deeds.",
  openGraph: {
    title: "Westshore Land Sales",
    description:
      "Premium waterfront and large-acreage land for sale on Florida's Gulf Coast.",
    url: SITE_URL,
    siteName: "Westshore Land Sales",
    locale: "en_US",
    type: "website",
  },
};

function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">
          <span className="brand-mark display">Westshore</span>
          <span className="brand-sub">Land Sales · FL Gulf Coast</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link className="nav-link" href="/#communities">Communities</Link>
          <Link className="nav-link" href="/#why">Why Florida</Link>
          <Link className="nav-link" href="/#financing">Financing</Link>
          <Link className="nav-link" href="/blog">Blog</Link>
          <Link className="btn btn-flag" href="/#contact">Request Info</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand display">Westshore Land Sales</div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/#communities">Communities</Link></li>
              <li><Link href="/#package">The Land Package</Link></li>
              <li><Link href="/#financing">Financing</Link></li>
              <li><Link href="/blog">Land Buying Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:8005550134">(800) 555-0134</a></li>
              <li><a href="mailto:info@example.com">info@example.com</a></li>
              <li><Link href="/#contact">Request property info</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          © {new Date().getFullYear()} Westshore Land Sales. All rights
          reserved. · Demo site — all copy, numbers, and contact details are
          placeholders pending client content. Obtain the property report
          required by federal law and read it before signing anything.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
