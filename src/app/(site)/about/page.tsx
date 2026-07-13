import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollFade from "@/components/site/ScrollFade";
import CountUp from "@/components/site/CountUp";
import { Zap, Sun, MapPin, Award, Globe, Cpu, Shield, Flag } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Olea Technologies",
  description: "Olea Technologies is a clean-energy company on a mission to end Africa's power uncertainty, one intelligently engineered system at a time.",
};

const STATS = [
  { icon: "Zap",    value: "500+", label: "INSTALLATIONS" },
  { icon: "Sun",    value: "2MW+", label: "CLEAN ENERGY"  },
  { icon: "MapPin", value: "6",    label: "STATES SERVED" },
  { icon: "Award",  value: "98%",  label: "SATISFACTION"  },
  { icon: "Globe",  value: "10+",  label: "INDUSTRIES"    },
];

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Zap, Sun, MapPin, Award, Globe,
};

const VALUES = [
  {
    icon: <Cpu size={22} />,
    title: "Engineered, not improvised",
    body: "We build systems, not shortcuts. Every install is designed to perform for decades, measured twice, built once.",
  },
  {
    icon: <Shield size={22} />,
    title: "Accountable for life",
    body: "We don't disappear after installation. The relationship starts at commissioning and lasts as long as the system does.",
  },
  {
    icon: <Flag size={22} />,
    title: "Africa-first, always",
    body: "Built for African conditions, African ambitions, and African talent. We train and employ where we work.",
  },
];

const ROADMAP = [
  { tag: "NOW",      dot: "var(--accent)",           place: "Owerri, Imo",     body: "Headquarters and our first installations, proving the model, home by home, business by business." },
  { tag: "NEXT",     dot: "rgba(255,255,255,0.35)",  place: "Across Nigeria",  body: "State by state, powering homes and industry with the same standard of engineering." },
  { tag: "THEN",     dot: "rgba(255,255,255,0.35)",  place: "West Africa",     body: "Taking clean, reliable energy regional, the same mission, a bigger map." },
  { tag: "THE GOAL", dot: "rgba(255,255,255,0.35)",  place: "A powered Africa", body: "And beyond. Globally competitive, African at the core." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 160, paddingBottom: 100, overflow: "hidden", minHeight: 520 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/about-hero.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.90) 0%, rgba(7,41,31,0.68) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.48)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>About</span>
          </nav>
          <span className="eyebrow">About Olea</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 22px", maxWidth: 660, lineHeight: 1.06 }}>
            We&apos;re not selling panels.<br />
            We&apos;re selling{" "}
            <span style={{ color: "var(--accent)" }}>freedom.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 540, lineHeight: 1.65, margin: 0 }}>
            Olea Technologies is a clean-energy company on a mission to end Africa&apos;s power uncertainty, one intelligently engineered system at a time.
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="hp-stats">
        <div className="container">
          <div className="hp-stats__grid">
            {STATS.map((s, i) => {
              const Icon = ICON_MAP[s.icon];
              return (
                <div key={s.label} className="hp-stats__item">
                  {i > 0 && <span className="hp-stats__divider" />}
                  <div className="hp-stats__icon">{Icon && <Icon size={20} />}</div>
                  <div className="hp-stats__value"><CountUp value={s.value} /></div>
                  <div className="hp-stats__label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── OUR STORY ── */}
      <section className="section section-white">
        <div className="container">
          <div className="about-story-grid">
            <ScrollFade from="left">
              <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 420 }}>
                <Image
                  src="/images/about/team-work.jpg"
                  alt="Olea Technologies team at work"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </ScrollFade>
            <ScrollFade delay={120} from="right">
              <div>
                <span className="eyebrow">Our Story</span>
                <h2 className="headline-section" style={{ margin: "0 0 22px" }}>
                  Born from a simple frustration.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--fg-2)", margin: "0 0 16px" }}>
                  Across Africa, brilliant homes and businesses are held back by one thing: power they can&apos;t rely on. Generators that drink diesel. Grids that vanish without warning. A constant, draining uncertainty.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--fg-2)", margin: "0 0 16px" }}>
                  We started Olea to end that, not with a cheaper generator or a quick panel sale, but with real infrastructure. Systems engineered to perform for 25 years, monitored intelligently, and backed by a team that picks up the phone.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--fg-2)", margin: "0 0 28px", fontWeight: 600 }}>
                  Most companies sell you panels. We sell you freedom, from NEPA, from generator costs, from uncertainty. Forever.
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn btn-primary">Talk to an Expert →</Link>
                  <Link href="/services" className="btn btn-outline-dark">Our Services</Link>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── WHAT WE STAND FOR ── */}
      <section className="section section-bg">
        <div className="container">
          <ScrollFade>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span className="eyebrow">What We Stand For</span>
              <h2 className="headline-section" style={{ marginInline: "auto" }}>
                Three things we refuse<br />to compromise.
              </h2>
            </div>
          </ScrollFade>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <ScrollFade key={v.title} delay={i * 80}>
                <div className="card" style={{ padding: "36px 28px" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    background: "var(--olea-green-50)",
                    color: "var(--olea-green-700)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20,
                  }}>
                    {v.icon}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--olea-ink)", margin: "0 0 10px", lineHeight: 1.25 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--fg-2)", margin: 0 }}>
                    {v.body}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="section section-dark" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(249,166,6,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative" }}>
          <ScrollFade>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span className="eyebrow">Where We&apos;re Headed</span>
              <h2 className="headline-section" style={{ color: "#fff", marginInline: "auto" }}>
                We&apos;re just getting started.
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.60)", maxWidth: 520, marginInline: "auto", lineHeight: 1.6 }}>
                We believe in being honest about where we are, and bold about where we&apos;re going.
              </p>
            </div>
          </ScrollFade>
          <div className="about-roadmap-grid">
            {ROADMAP.map((r, i) => (
              <ScrollFade key={r.tag} delay={i * 80}>
                <div style={{
                  background: i === 0 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
                  border: i === 0 ? "1px solid rgba(249,166,6,0.30)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "28px 24px",
                  height: "100%",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 9999, background: r.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                      {r.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 10px", lineHeight: 1.2 }}>
                    {r.place}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                    {r.body}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOLD CTA ── */}
      <section style={{ background: "var(--accent)", padding: "80px 0" }}>
        <div className="container">
          <div className="about-cta-grid">
            <ScrollFade>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--olea-green-900)", opacity: 0.65, display: "block", marginBottom: 12 }}>
                  Ready When You Are
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 44px)", color: "var(--olea-green-900)", margin: "0 0 10px", lineHeight: 1.1 }}>
                  Power your home or<br />business with Olea.
                </h2>
                <p style={{ fontSize: 15, color: "var(--olea-green-900)", opacity: 0.70, margin: 0 }}>
                  Talk to an energy expert today and take the first step toward permanent power independence.
                </p>
              </div>
            </ScrollFade>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", background: "var(--olea-green-900)", color: "#fff", borderRadius: 9999, padding: "14px 28px", fontSize: 14.5, fontWeight: 700, fontFamily: "var(--font-sans)", textDecoration: "none" }}>
                Talk to an Expert →
              </Link>
              <Link href="/services" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "var(--olea-green-900)", border: "2px solid var(--olea-green-900)", borderRadius: 9999, padding: "13px 28px", fontSize: 14.5, fontWeight: 700, fontFamily: "var(--font-sans)", textDecoration: "none" }}>
                Meet the Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .about-roadmap-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .about-cta-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 1023px) {
          .about-roadmap-grid { grid-template-columns: repeat(2, 1fr); }
          .about-cta-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 767px) {
          .about-story-grid  { grid-template-columns: 1fr; gap: 32px; }
          .about-values-grid { grid-template-columns: 1fr; }
          .about-roadmap-grid { grid-template-columns: 1fr; }
          .about-cta-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
