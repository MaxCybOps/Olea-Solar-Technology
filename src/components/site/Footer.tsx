"use client";

import Link from "next/link";
import Image from "next/image";

const SOCIALS = [
  { name: "X",         href: "#", path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" },
  { name: "Facebook",  href: "#", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", href: "#", path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" },
  { name: "LinkedIn",  href: "#", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "YouTube",   href: "#", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

const NAV_COLS = [
  {
    id: "solutions", title: "Solutions",
    items: [
      { label: "Clean Energy",   href: "/services#cei" },
      { label: "Smart Systems",  href: "/services#ses" },
      { label: "Industrial",     href: "/services#ies" },
      { label: "Consulting",     href: "/services#con" },
      { label: "Maintenance",    href: "/services#mnt" },
      { label: "Academy",        href: "/services#aca" },
    ],
  },
  {
    id: "shop", title: "Shop",
    items: [
      { label: "Solar Panels",      href: "/products?category=solar_panels" },
      { label: "Inverters",         href: "/products?category=inverters" },
      { label: "Batteries",         href: "/products?category=batteries" },
      { label: "Charge Controllers",href: "/products?category=charge_controllers" },
      { label: "Accessories",       href: "/products?category=accessories" },
      { label: "Complete Systems",  href: "/products?category=systems" },
    ],
  },
  {
    id: "company", title: "Company",
    items: [
      { label: "About Us",  href: "/about" },
      { label: "Services",  href: "/services" },
      { label: "Blog",      href: "/blog" },
      { label: "Reviews",   href: "/testimonials" },
      { label: "FAQs",      href: "/faqs" },
      { label: "Contact",   href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="container">

        {/* ── Main grid ── */}
        <div className="ft-grid">

          {/* Brand */}
          <div className="ft-brand">
            <Image src="/images/logo-white.png" alt="Olea Technologies" width={136} height={36} style={{ height: 36, width: "auto" }} />
            <p className="ft-brand__desc">
              Clean energy infrastructure for Africa's future. Engineered to last, designed for freedom.
            </p>
            <div className="ft-socials">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.name} className="ft-social-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.id} className={`ft-nav ft-nav--${col.id}`}>
              <div className="ft-nav__title">{col.title}</div>
              <ul className="ft-nav__list">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="ft-nav__link">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="ft-newsletter">
            <div className="ft-newsletter__head">Power up your inbox.</div>
            <p className="ft-newsletter__sub">Monthly clean-energy insights. No spam, ever.</p>
            <NewsletterForm />
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <span className="ft-bottom__copy">© {new Date().getFullYear()} Olea Technologies. All rights reserved.</span>
          <div className="ft-bottom__links">
            <Link href="/privacy" className="ft-bottom__link">Privacy Policy</Link>
            <Link href="/terms"   className="ft-bottom__link">Terms of Service</Link>
          </div>
        </div>

      </div>

      <style>{`
        /* ── Footer base ── */
        .ft {
          background: var(--olea-green-900);
          color: #fff;
          padding-top: 72px;
          padding-bottom: 28px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        /* ── Grid layout ── */
        .ft-grid {
          display: grid;
          grid-template-columns: 1.45fr 1fr 1fr 1fr 1.45fr;
          grid-template-areas: "brand sol shop co news";
          gap: 44px;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(255,255,255,0.09);
        }
        .ft-brand          { grid-area: brand; }
        .ft-nav--solutions { grid-area: sol; }
        .ft-nav--shop      { grid-area: shop; }
        .ft-nav--company   { grid-area: co; }
        .ft-newsletter     { grid-area: news; }

        /* Brand */
        .ft-brand__desc {
          font-size: 13.5px;
          color: rgba(255,255,255,0.60);
          line-height: 1.62;
          margin: 18px 0 20px;
          max-width: 260px;
        }
        .ft-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .ft-social-btn {
          width: 34px; height: 34px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          transition: background 200ms, color 200ms, transform 200ms;
          flex-shrink: 0;
        }
        .ft-social-btn:hover {
          background: var(--accent);
          color: var(--olea-green-900);
          transform: translateY(-2px);
          border-color: transparent;
        }

        /* Nav columns */
        .ft-nav__title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .ft-nav__list { list-style: none; margin: 0; padding: 0; }
        .ft-nav__list li { margin-bottom: 9px; }
        .ft-nav__link {
          font-size: 13.5px;
          color: rgba(255,255,255,0.68);
          transition: color 180ms, padding-left 180ms;
          display: inline-block;
        }
        .ft-nav__link:hover { color: var(--accent); padding-left: 4px; }

        /* Newsletter */
        .ft-newsletter__head {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #fff;
        }
        .ft-newsletter__sub {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          margin: 0 0 14px;
          line-height: 1.5;
        }

        /* Bottom bar */
        .ft-bottom {
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .ft-bottom__copy  { font-size: 12px; color: rgba(255,255,255,0.38); }
        .ft-bottom__links { display: flex; gap: 20px; }
        .ft-bottom__link  { font-size: 12px; color: rgba(255,255,255,0.55); transition: color 180ms; }
        .ft-bottom__link:hover { color: var(--accent); }

        /* ── Tablet 768–1023px ── */
        @media (max-width: 1023px) {
          .ft { padding-top: 52px; }
          .ft-grid {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas:
              "brand brand news"
              "sol   shop  co";
            gap: 28px 24px;
          }
          .ft-brand__desc { max-width: 100%; }
          .ft-newsletter { align-self: start; }
        }

        /* ── Mobile <768px — hide nav, show brand + newsletter only ── */
        @media (max-width: 767px) {
          .ft { padding-top: 40px; padding-bottom: 16px; }
          .ft-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "brand"
              "news";
            gap: 24px;
            padding-bottom: 32px;
          }
          /* Hide nav columns — accessible via hamburger menu */
          .ft-nav { display: none; }
          .ft-brand__desc { font-size: 13px; max-width: 360px; }
          .ft-newsletter__head { font-size: 14px; }
          .ft-bottom { gap: 8px; }
        }

        /* ── Small mobile <480px ── */
        @media (max-width: 479px) {
          .ft { padding-top: 32px; }
          .ft-brand__desc { font-size: 12.5px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 6px; }
        }
      `}</style>
    </footer>
  );
}

function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 9999,
        padding: 4,
      }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        required
        aria-label="Email address for newsletter"
        style={{
          flex: 1, background: "transparent", border: "none", outline: "none",
          color: "#fff", padding: "9px 14px", fontSize: 13,
          fontFamily: "var(--font-sans)", minWidth: 0,
        }}
      />
      <button
        type="submit"
        style={{
          background: "var(--accent)", color: "var(--olea-ink)", border: "none",
          padding: "9px 16px", borderRadius: 9999, fontWeight: 600,
          fontSize: 13, cursor: "pointer", letterSpacing: "0.02em", flexShrink: 0,
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
