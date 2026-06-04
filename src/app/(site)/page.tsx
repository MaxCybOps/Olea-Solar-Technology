import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroParticles from "@/components/site/HeroParticles";
import CountUp from "@/components/site/CountUp";
import ScrollFade from "@/components/site/ScrollFade";
import ImpactSection from "@/components/site/ImpactSection";
import GallerySection from "@/components/site/GallerySection";
import FeaturedProducts from "@/components/site/FeaturedProducts";
import PurposeCarousel from "@/components/site/PurposeCarousel";
import { STATS, SERVICES, DIFFERENTIATORS, TESTIMONIALS } from "@/lib/constants";
import { Zap, Sun, MapPin, Award, Globe, Building2, Bot, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Olea Technologies — Powering Sustainable Future",
  description: "Africa's premium clean-energy company. Solar systems, smart infrastructure, and real support from installation to forever.",
};

const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Zap, Sun, MapPin, Award, Globe, Building2, Bot, ShieldCheck, Users,
};

const SERVICE_IMAGES: Record<string, string> = {
  cei: "/images/services/cei.jpg",
  ses: "/images/services/ses.jpg",
  ies: "/images/services/ies.jpg",
  con: "/images/services/consulting.jpg",
  mnt: "/images/services/mnt.jpg",
  aca: "/images/services/aca.jpg",
};

const BLOG_POSTS = [
  { id: "b1", title: "What size solar system does your home actually need?", cat: "Energy Education", date: "May 12, 2026", read: "6 min", image: "/images/blog/solar-sizing.jpg" },
  { id: "b2", title: "Inside a 50KVA install at a Lagos factory", cat: "Installation Stories", date: "Apr 28, 2026", read: "8 min", image: "/images/blog/factory-install.jpg" },
  { id: "b3", title: "Lithium vs. lead-acid: a 2026 buyer's guide", cat: "Tech & Innovation", date: "Apr 14, 2026", read: "5 min", image: "/images/blog/battery-guide.jpg" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "var(--bg-dark)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        {/* Video background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <video
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", animation: "heroKenBurns 26s ease-in-out infinite alternate" }}
            src="/videos/hero-fields.mp4"
            poster="/images/hero-poster.jpg"
            preload="none"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(100deg, rgba(7,41,31,0.94) 0%, rgba(7,41,31,0.82) 42%, rgba(7,41,31,0.5) 100%)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "42%", zIndex: 1, background: "linear-gradient(180deg, transparent, var(--bg-dark))" }} />
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(249,166,6,0.18) 0%, transparent 60%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-15%", width: 700, height: 700, background: "radial-gradient(circle, rgba(26,122,74,0.32) 0%, transparent 65%)", pointerEvents: "none", zIndex: 1 }} />

        <HeroParticles />

        {/* Content */}
        <div className="container-wide" style={{ position: "relative", zIndex: 3, width: "100%" }}>
          <div style={{ maxWidth: 920 }}>
            <span className="eyebrow" style={{ color: "var(--accent)" }}>Powering Africa's Future</span>
            <h1
              className="t-hero"
              style={{ color: "#fff", margin: "0 0 28px" }}
            >
              Africa doesn't need to{" "}
              <span style={{ color: "var(--accent)" }}>beg</span>{" "}
              for power anymore.
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", maxWidth: 640, margin: "0 0 40px" }}>
              Olea Technologies builds clean energy infrastructure that drives homes, businesses,
              and industries into the future — intelligently, sustainably, and at scale.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/products" className="btn btn-primary">Explore Our Solutions →</Link>
              <Link href="/contact" className="btn btn-outline-light">Get a Free Assessment</Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, color: "#fff" }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.4)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: "#fff", animation: "scrollPulse 2s ease-in-out infinite" }} />
          </div>
        </div>

        {/* Gold ribbon */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.5, zIndex: 4 }} />
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ background: "var(--olea-green-900)", color: "#fff", padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, textAlign: "center", maxWidth: 960, margin: "0 auto" }}>
            {STATS.map((s, i) => {
              const Icon = LUCIDE_ICONS[s.icon];
              return (
                <div key={s.label} style={{ padding: "0 10px", position: "relative" }}>
                  {i > 0 && <span style={{ position: "absolute", left: 0, top: "15%", height: "70%", width: 1, background: "rgba(255,255,255,0.10)" }} />}
                  <div style={{ color: "var(--accent)", marginBottom: 6, display: "flex", justifyContent: "center" }}>
                    {Icon && <Icon size={22} />}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 2.4vw, 34px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    <CountUp value={s.value} />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.55, marginTop: 7, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── WHAT WE DO ── */}
      <section className="section section-white">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="wwd-grid">
            <ScrollFade>
              <PurposeCarousel />
            </ScrollFade>
            <ScrollFade delay={120}>
              <span className="eyebrow">Our Purpose</span>
              <h2 className="headline-section">
                We don't just sell solar.<br />We engineer energy ecosystems.
              </h2>
              <p className="lead" style={{ marginBottom: 28 }}>
                From a single home to an entire industrial complex — every solution we deploy is intelligent,
                scalable, and engineered to perform for decades. We combine clean energy innovation,
                infrastructure-grade engineering, and smart technology to deliver long-term impact.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 32 }}>
                {[
                  { icon: "⚡", title: "Clean Energy" },
                  { icon: "🧠", title: "Smart Systems" },
                  { icon: "🌱", title: "Sustainability" },
                ].map((p) => (
                  <div key={p.title} style={{ padding: 20, borderRadius: 12, border: "1px solid var(--border-subtle)", background: "#fff" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--olea-green-50)", color: "var(--olea-green-600)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 20 }}>
                      {p.icon}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: "var(--olea-ink)" }}>{p.title}</div>
                  </div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, marginInline: "auto" }}>
            <span className="eyebrow">Services</span>
            <h2 className="headline-section">What we build for you.</h2>
            <p className="lead" style={{ margin: "0 auto" }}>Six divisions. One vision. A powered Africa.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="services-grid">
            {SERVICES.map((s, i) => (
              <ScrollFade key={s.id} delay={i * 70}>
                <Link href={`/services#${s.id}`} className="card card-hoverable" style={{ overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none" }}>
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "var(--olea-green-900)" }}>
                    <Image
                      src={SERVICE_IMAGES[s.id] ?? "/images/services/cei.jpg"}
                      alt={s.name}
                      fill
                      style={{ objectFit: "cover", transition: "transform 500ms var(--ease-out)" }}
                      className="service-card-img"
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,41,31,0.05) 50%, rgba(7,41,31,0.55) 100%)" }} />
                  </div>
                  <div style={{ padding: "26px 28px 30px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: i % 3 === 1 ? "var(--olea-gold-50)" : "var(--olea-green-50)", color: i % 3 === 1 ? "var(--olea-gold-700)" : "var(--olea-green-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Zap size={22} />
                      </div>
                      <h4 style={{ fontWeight: 600, fontSize: 20, lineHeight: 1.25, margin: 0, color: "var(--olea-ink)" }}>{s.name}</h4>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)", margin: "0 0 20px" }}>{s.blurb}</p>
                    <span style={{ color: "var(--accent-hover)", fontWeight: 600, fontSize: 14, letterSpacing: "0.02em" }}>Learn More →</span>
                  </div>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OLEA ── */}
      <section className="section section-dark" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 900, height: 900, background: "radial-gradient(circle, rgba(249,166,6,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto", position: "relative" }}>
            <span className="eyebrow">Why Olea</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 24px", color: "#fff" }}>
              Most companies sell you panels.<br />We sell you{" "}
              <span style={{ color: "var(--accent)" }}>freedom.</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: "rgba(255,255,255,0.72)", margin: 0 }}>
              Freedom from NEPA. Freedom from generator costs.<br />
              Freedom from uncertainty. Forever.
            </p>
          </div>
          <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="diff-grid">
            {DIFFERENTIATORS.map((d, i) => {
              const Icon = LUCIDE_ICONS[d.icon];
              return (
                <ScrollFade key={d.title} delay={i * 80}>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 28, transition: "var(--t-base)" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(249,166,6,0.14)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                      {Icon && <Icon size={22} />}
                    </div>
                    <h5 style={{ fontWeight: 600, fontSize: 17, margin: "0 0 8px", color: "#fff" }}>{d.title}</h5>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, margin: 0 }}>{d.body}</p>
                  </div>
                </ScrollFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMPACT + NIGERIA MAP ── */}
      <ImpactSection />

      {/* ── GALLERY ── */}
      <GallerySection />

      {/* ── FEATURED PRODUCTS ── */}
      <FeaturedProducts />

      {/* ── TESTIMONIALS ── */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, marginInline: "auto" }}>
            <span className="eyebrow">What Our Clients Say</span>
            <h2 className="headline-section">Don't take our word for it.</h2>
            <p className="lead" style={{ margin: "0 auto" }}>Real clients. Real installations. Real freedom.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <ScrollFade key={t.name} delay={i * 90}>
                <div className="card card-hoverable" style={{ padding: 32 }}>
                  <div style={{ color: "var(--accent)", fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>{"★".repeat(t.rating)}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--olea-ink)", margin: "0 0 20px" }}>"{t.quote}"</p>
                  <hr style={{ height: 1, background: "var(--border-subtle)", border: 0, margin: "0 0 16px" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 9999, background: "linear-gradient(135deg, var(--olea-green-700), var(--olea-green-900))", color: "var(--accent)", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "var(--olea-ink)" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{t.role} · {t.location}</div>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link href="/testimonials" className="btn btn-outline-dark">Read More Reviews →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div style={{ background: "var(--accent)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-10%", top: "-50%", width: 500, height: 500, background: "radial-gradient(circle, rgba(11,61,46,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", position: "relative" }}>
            <div style={{ flex: 1, minWidth: 320 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--olea-green-900)", opacity: 0.7, marginBottom: 14 }}>
                Ready when you are
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 14px", color: "var(--olea-green-900)" }}>
                Your next power outage should be your last.
              </h2>
              <p style={{ fontSize: 17, color: "var(--olea-green-900)", opacity: 0.78, margin: 0, maxWidth: 560 }}>
                Talk to an energy expert today and take the first step toward permanent power independence.
              </p>
            </div>
            <Link href="/contact" className="btn btn-green" style={{ flexShrink: 0, fontSize: 16, padding: "17px 30px" }}>
              Talk to an Expert →
            </Link>
          </div>
        </div>
      </div>

      {/* ── BLOG PREVIEW ── */}
      <section className="section section-white">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
            <div>
              <span className="eyebrow">Insights</span>
              <h2 className="headline-section" style={{ marginBottom: 8 }}>From the Olea blog.</h2>
              <p className="lead">Practical guides, install stories, and the science of clean energy.</p>
            </div>
            <Link href="/blog" className="btn btn-outline-dark" style={{ flexShrink: 0 }}>Read All Articles →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="blog-grid">
            {BLOG_POSTS.map((b, i) => (
              <ScrollFade key={b.id} delay={i * 80}>
                <Link href={`/blog/${b.id}`} className="card card-hoverable" style={{ overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none" }}>
                  <div style={{ aspectRatio: "16/10", position: "relative", overflow: "hidden", background: "var(--olea-green-900)" }}>
                    <Image src={b.image} alt={b.title} fill style={{ objectFit: "cover", transition: "transform 500ms var(--ease-out)" }} className="blog-card-img" />
                    <span style={{ position: "absolute", top: 16, left: 16, zIndex: 2, background: "var(--accent)", color: "var(--olea-ink)", padding: "4px 10px", borderRadius: 4, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {b.cat}
                    </span>
                  </div>
                  <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h4 style={{ fontWeight: 600, fontSize: 17.5, lineHeight: 1.35, margin: "0 0 14px", color: "var(--olea-ink)" }}>{b.title}</h4>
                    <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
                      <span>{b.date}</span>
                      <span>{b.read} read</span>
                    </div>
                  </div>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .card-hoverable:hover .service-card-img { transform: scale(1.06); }
        .card-hoverable:hover .blog-card-img    { transform: scale(1.06); }

        @media (max-width: 1024px) {
          .wwd-grid    { grid-template-columns: 1fr !important; }
          .diff-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          [style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 820px) {
          [style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          [style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gap: 80px"] { gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .testi-grid    { grid-template-columns: 1fr !important; }
          .blog-grid     { grid-template-columns: 1fr !important; }
          .diff-grid     { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          [style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          [style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
          [style*="repeat(5, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-cta-row { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}
