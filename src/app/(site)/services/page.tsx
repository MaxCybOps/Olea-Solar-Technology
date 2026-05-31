import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "@/components/site/ScrollFade";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: "Six divisions. One vision. Clean energy infrastructure, smart systems, industrial solutions, consulting, maintenance, and academy.",
};

const PROCESS_STEPS = [
  { num: "01", title: "Free Assessment", body: "Our experts visit your site, analyse your energy consumption, and identify the perfect solution." },
  { num: "02", title: "Custom Design", body: "We engineer a system tailored to your exact needs — no cookie-cutter solutions." },
  { num: "03", title: "Professional Installation", body: "Our certified technicians install your system to the highest standards, on time." },
  { num: "04", title: "Ongoing Support", body: "We monitor, maintain, and support your system long after installation. Always." },
];

const MARKETS = [
  { title: "Residential", icon: "🏠", desc: "From small homes to luxury estates — permanent power independence for every home." },
  { title: "SMEs", icon: "🏪", desc: "Cut operating costs and eliminate generator dependency for your business." },
  { title: "Industrial", icon: "🏭", desc: "High-capacity energy infrastructure that keeps your operations running 24/7." },
  { title: "Government", icon: "🏛️", desc: "Scalable clean energy for public institutions, schools, and civic infrastructure." },
  { title: "Investors", icon: "📈", desc: "Partner with us to build Africa's clean energy future at scale." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--bg-dark)", color: "#fff", paddingTop: 160, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "45%", background: "linear-gradient(270deg, rgba(249,166,6,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">What We Build</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 20px", maxWidth: 680 }}>
            Not a product.<br />
            <span style={{ color: "var(--accent)" }}>An infrastructure.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 560, lineHeight: 1.6 }}>
            Everything we build is designed for scale, reliability, and decades of performance.
          </p>
          <nav style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>Services</span>
          </nav>
        </div>
      </section>

      {/* Services detail */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <ScrollFade key={s.id} delay={0}>
                <div
                  id={s.id}
                  className="card"
                  style={{ padding: "48px 48px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, alignItems: "start" }}
                >
                  <div>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: i % 2 === 0 ? "var(--olea-green-50)" : "var(--olea-gold-50)", color: i % 2 === 0 ? "var(--olea-green-600)" : "var(--olea-gold-700)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 24 }}>
                      ⚡
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 24, color: "var(--olea-ink)", margin: "0 0 12px", lineHeight: 1.2 }}>{s.name}</h3>
                    <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6, margin: "0 0 24px" }}>{s.blurb}</p>
                    <Link href="/contact" className="btn btn-primary btn-sm">Request This Service →</Link>
                  </div>
                  <div>
                    <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--fg-1)", margin: "0 0 28px" }}>{s.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {["Residential", "Commercial", "Industrial"].map((tag) => (
                        <span key={tag} className="tag tag-success">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section-dark" style={{ position: "relative", overflow: "hidden" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="eyebrow">How We Work</span>
            <h2 className="headline-section" style={{ color: "#fff" }}>Our process, from consultation to forever.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative" }} className="process-grid">
            {/* Connecting line */}
            <div style={{ position: "absolute", top: 28, left: "12%", right: "12%", height: 1, background: "rgba(255,255,255,0.12)", zIndex: 0 }} />
            {PROCESS_STEPS.map((step, i) => (
              <ScrollFade key={step.num} delay={i * 80}>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 9999, background: "var(--accent)", color: "var(--olea-green-900)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, margin: "0 auto 20px" }}>
                    {step.num}
                  </div>
                  <h4 style={{ fontWeight: 600, fontSize: 18, color: "#fff", margin: "0 0 12px" }}>{step.title}</h4>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>{step.body}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="section section-white">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow">Who We Serve</span>
            <h2 className="headline-section">Built for every scale.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} className="markets-grid">
            {MARKETS.map((m, i) => (
              <ScrollFade key={m.title} delay={i * 60}>
                <div className="card card-hoverable" style={{ padding: "28px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{m.icon}</div>
                  <h4 style={{ fontWeight: 700, fontSize: 17, margin: "0 0 10px", color: "var(--olea-ink)" }}>{m.title}</h4>
                  <p style={{ fontSize: 13.5, color: "var(--fg-2)", lineHeight: 1.55, margin: 0 }}>{m.desc}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: "var(--accent)", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "var(--olea-green-900)", margin: "0 0 16px" }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: 17, color: "var(--olea-green-800)", margin: "0 0 28px" }}>
            Book a free consultation — we'll assess your needs and design the right solution.
          </p>
          <Link href="/contact" className="btn btn-green">Book a Free Consultation →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .process-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .markets-grid  { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          [style*="1fr 2fr"] { grid-template-columns: 1fr !important; }
          .markets-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .markets-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
