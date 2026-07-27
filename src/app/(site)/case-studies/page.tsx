import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/case-studies-data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real Olea installations, real numbers — from an industrial factory to a 12-clinic healthcare network to a secondary school in Owerri.",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 160, paddingBottom: 88, overflow: "hidden", minHeight: 460 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/blog/factory-install.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.92) 0%, rgba(7,41,31,0.72) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.50)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>Case Studies</span>
          </nav>
          <span className="eyebrow">Proof, Not Promises</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 22px", maxWidth: 780, lineHeight: 1.06 }}>
            Real installs.<br />
            <span style={{ color: "var(--accent)" }}>Real numbers.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 660, lineHeight: 1.7, margin: 0 }}>
            From a Lagos textile factory to a 12-clinic healthcare network to a school in Owerri, here's exactly what changed, in naira and in uptime.
          </p>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      {CASE_STUDIES.map((cs, i) => {
        const imgLeft = i % 2 === 1;
        return (
          <section key={cs.id} className={`section ${i % 2 === 0 ? "section-white" : "section-bg"}`}>
            <div className="container">
              <div className="cs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", direction: imgLeft ? "rtl" : "ltr" }}>
                <div style={{ direction: "ltr", position: "relative", aspectRatio: "4/3", borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
                  <Image src={cs.image} alt={cs.title} fill style={{ objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: 18, left: 18, background: "var(--accent)", color: "var(--olea-green-900)", padding: "5px 14px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {cs.category}
                  </span>
                </div>

                <div style={{ direction: "ltr" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--olea-green-700)", marginBottom: 10 }}>
                    {cs.client} · {cs.location}
                  </div>
                  <h2 className="headline-section" style={{ marginBottom: 18 }}>{cs.title}</h2>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 26 }} className="cs-stats">
                    {cs.stats.map((s) => (
                      <div key={s.label} style={{ background: i % 2 === 0 ? "var(--olea-green-50)" : "#fff", borderRadius: 12, padding: "16px 10px", textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px, 2vw, 24px)", color: "var(--olea-green-800)", lineHeight: 1.1 }}>{s.value}</div>
                        <div style={{ fontSize: 10.5, color: "var(--fg-2)", marginTop: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--fg-2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>The Challenge</div>
                    <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--fg-1)", margin: 0 }}>{cs.challenge}</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--fg-2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>The Solution</div>
                    <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--fg-1)", margin: 0 }}>{cs.solution}</p>
                  </div>
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--fg-2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>The Result</div>
                    <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--fg-1)", margin: 0 }}>{cs.results}</p>
                  </div>

                  <blockquote style={{ borderLeft: "3px solid var(--accent)", padding: "4px 0 4px 18px", margin: "0 0 22px", fontStyle: "italic", fontSize: 14.5, color: "var(--olea-green-800)", lineHeight: 1.6 }}>
                    "{cs.quote}"
                  </blockquote>

                  <Link href={`/blog/${cs.blogSlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--olea-green-700)", textDecoration: "none" }}>
                    Read the full story <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <div style={{ background: "var(--accent)", padding: "72px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.1, margin: "0 0 12px", color: "var(--olea-green-900)" }}>
              Want numbers like these for your site?
            </h2>
            <p style={{ fontSize: 16, color: "var(--olea-green-800)", margin: 0, maxWidth: 520 }}>
              Every installation starts with a free assessment. Tell us what you're running and we'll model the exact payback.
            </p>
          </div>
          <Link href="/contact" className="btn btn-green" style={{ flexShrink: 0, fontSize: 16, padding: "16px 30px" }}>
            Get a Free Assessment →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cs-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
        @media (max-width: 480px) {
          .cs-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
