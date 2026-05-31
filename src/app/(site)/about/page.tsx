import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollFade from "@/components/site/ScrollFade";

export const metadata: Metadata = {
  title: "About Us",
  description: "We didn't start Olea because it was a good business idea. We started it because Africa deserves better.",
};

const VALUES = [
  { icon: "🏆", title: "Excellence", body: "We set the standard for what clean energy delivery looks like in Africa." },
  { icon: "🤝", title: "Integrity", body: "We say what we mean and deliver what we promise. Every time." },
  { icon: "💡", title: "Innovation", body: "We bring technology that thinks — not just panels that sit on rooftops." },
  { icon: "🌱", title: "Sustainability", body: "Everything we build is designed to last and protect the planet." },
  { icon: "🚀", title: "Empowerment", body: "We transfer knowledge and capacity with every installation." },
  { icon: "🌍", title: "Impact", body: "We measure success by the lives we change, not just the megawatts we install." },
];

const TEAM = [
  { name: "Dozie", role: "Chief Executive Officer", initials: "DO", bio: "Visionary leader driving Olea's mission to power Africa's future." },
  { name: "Operations Lead", role: "Chief Operations Officer", initials: "OL", bio: "Ensuring every installation meets Olea's world-class standards." },
  { name: "Tech Lead", role: "Head of Engineering", initials: "TL", bio: "Building the smart systems that make our installations intelligent." },
];

const MILESTONES = [
  { year: "2022", event: "Olea Technologies founded in Owerri, Imo State" },
  { year: "2023", event: "First 50 residential installations completed" },
  { year: "2024", event: "Expanded to commercial and industrial clients" },
  { year: "2025", event: "Launched Smart Energy Monitoring platform" },
  { year: "2026", event: "Digital platform launch — serving all of Nigeria" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero banner */}
      <section style={{ background: "var(--bg-dark)", color: "#fff", paddingTop: 160, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-5%", top: "0%", width: 500, height: 500, background: "radial-gradient(circle, rgba(249,166,6,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <span className="eyebrow">About Olea Technologies</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 20px", maxWidth: 700 }}>
            Powering Africa's<br />
            <span style={{ color: "var(--accent)" }}>Sustainable Future.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 580, lineHeight: 1.6 }}>
            We didn't start Olea because it was a good business idea.<br />
            We started it because Africa deserves better.
          </p>
          <nav style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>About</span>
          </nav>
        </div>
      </section>

      {/* Opening statement */}
      <section className="section section-white">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <ScrollFade>
            <span className="eyebrow">Our Story</span>
            <h2 className="headline-section" style={{ marginInline: "auto" }}>
              Built for Africa. Built to last.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--fg-2)", maxWidth: "65ch", margin: "0 auto 32px" }}>
              Nigeria loses billions annually to power outages. Businesses die. Hospitals struggle. Families suffer.
              Olea Technologies was born from a simple conviction: Africa has all the sunlight it needs. What it lacked
              was the infrastructure, intelligence, and commitment to harness it properly.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--fg-2)", maxWidth: "65ch", margin: "0 auto" }}>
              We started in Owerri, Imo State, with a vision that extends across the continent. Every system we install
              is a step toward an Africa that doesn't beg for power — one that produces its own, cleanly and forever.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="vm-grid">
            <ScrollFade>
              <div style={{ background: "var(--bg-dark)", color: "#fff", borderRadius: 16, padding: 48, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(249,166,6,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
                <span className="eyebrow">Vision</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
                  A powered Africa.
                </h3>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: 0 }}>
                  To power Africa's future through intelligent, sustainable, and transformative energy innovation —
                  making reliable clean energy the norm, not the exception.
                </p>
              </div>
            </ScrollFade>
            <ScrollFade delay={100}>
              <div style={{ background: "var(--accent)", borderRadius: 16, padding: 48, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(11,61,46,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
                <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--olea-green-900)", opacity: 0.7, marginBottom: 16, display: "block" }}>Mission</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--olea-green-900)", margin: "0 0 16px", lineHeight: 1.15 }}>
                  Build. Empower. Transform.
                </h3>
                <p style={{ fontSize: 16, color: "var(--olea-green-800)", lineHeight: 1.7, margin: 0 }}>
                  To provide reliable clean-energy infrastructure, smart technology solutions, and human-capital
                  development that enable businesses, institutions, and communities to thrive sustainably.
                </p>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-white">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow">What We Stand For</span>
            <h2 className="headline-section">Our Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="values-grid">
            {VALUES.map((v, i) => (
              <ScrollFade key={v.title} delay={i * 60}>
                <div className="card card-hoverable" style={{ padding: 32 }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
                  <h4 style={{ fontWeight: 700, fontSize: 20, margin: "0 0 12px", color: "var(--olea-ink)" }}>{v.title}</h4>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)", margin: 0 }}>{v.body}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-dark" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(249,166,6,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="eyebrow">Our Journey</span>
            <h2 className="headline-section" style={{ color: "#fff" }}>Milestones</h2>
          </div>
          <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.10)", transform: "translateX(-50%)" }} />
            {MILESTONES.map((m, i) => (
              <ScrollFade key={m.year} delay={i * 80}>
                <div style={{ display: "flex", gap: 32, marginBottom: 40, alignItems: "flex-start", flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}>
                  <div style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: "var(--accent)", display: "block" }}>{m.year}</span>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.5, margin: 0 }}>{m.event}</p>
                  </div>
                  <div style={{ width: 16, height: 16, borderRadius: 9999, background: "var(--accent)", flexShrink: 0, marginTop: 8, position: "relative", zIndex: 1 }} />
                  <div style={{ flex: 1 }} />
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-bg" style={{ textAlign: "center" }}>
        <div className="container-narrow">
          <span className="eyebrow">Work With Us</span>
          <h2 className="headline-section" style={{ marginInline: "auto" }}>Ready to power your future?</h2>
          <p className="lead" style={{ margin: "0 auto 32px" }}>
            Whether you're a homeowner, business owner, or industrial facility — we have a solution for you.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Get a Free Assessment →</Link>
            <Link href="/services" className="btn btn-outline-dark">View Our Services</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-grid     { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
