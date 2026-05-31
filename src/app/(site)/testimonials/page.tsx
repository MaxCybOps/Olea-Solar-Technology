import type { Metadata } from "next";
import Link from "next/link";
import ScrollFade from "@/components/site/ScrollFade";
import { TESTIMONIALS, STATS } from "@/lib/constants";
import CountUp from "@/components/site/CountUp";
import { Zap, Sun, MapPin, Award, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Reviews",
  description: "Real people. Real power. Real results. See what our clients say about Olea Technologies.",
};

const EXTRA_TESTIMONIALS = [
  { quote: "We were sceptical about solar for our hotel but Olea's team walked us through everything, handled the installation in 3 days, and our electricity bills dropped by 80%. We wish we had done this years ago.", name: "Hotel Manager", role: "Hospitality", location: "Port Harcourt", initials: "HM", rating: 5 },
  { quote: "Olea installed a complete 10KVA system for our school. The students can study at night now without generator noise. Education shouldn't be disrupted by NEPA.", name: "Principal Okafor", role: "Education Sector", location: "Enugu", initials: "PO", rating: 5 },
  { quote: "The monitoring app is brilliant. I can see exactly how much power we're generating and consuming from my phone. Three years and not a single major issue.", name: "Dr. Nnamdi A.", role: "Medical Clinic Owner", location: "Lagos", initials: "NA", rating: 5 },
];

const ALL_TESTIMONIALS = [...TESTIMONIALS, ...EXTRA_TESTIMONIALS];

const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = { Zap, Sun, MapPin, Award, Globe };

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--bg-dark)", color: "#fff", paddingTop: 160, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(249,166,6,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <span className="eyebrow">Client Reviews</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 auto 20px", maxWidth: 700 }}>
            Real People. Real Power.<br />
            <span style={{ color: "var(--accent)" }}>Real Results.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 540, lineHeight: 1.6, margin: "0 auto" }}>
            Don't take our word for it. Here's what our clients say about life after Olea.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: "var(--olea-green-900)", color: "#fff", padding: "28px 0" }}>
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
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 2.4vw, 34px)", lineHeight: 1 }}>
                    <CountUp value={s.value} />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.55, marginTop: 7, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials grid */}
      <section className="section section-bg">
        <div className="container">
          <div style={{ columns: "3 300px", columnGap: 20 }}>
            {ALL_TESTIMONIALS.map((t, i) => (
              <ScrollFade key={t.name + i} delay={i * 60}>
                <div className="card card-hoverable" style={{ padding: 32, marginBottom: 20, breakInside: "avoid" }}>
                  <div style={{ color: "var(--accent)", fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>{"★".repeat(t.rating)}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--olea-ink)", margin: "0 0 20px", fontStyle: "italic" }}>"{t.quote}"</p>
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
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: "var(--accent)", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "var(--olea-green-900)", margin: "0 0 16px" }}>
            Ready to join them?
          </h2>
          <p style={{ fontSize: 17, color: "var(--olea-green-800)", margin: "0 0 28px" }}>Get your free energy assessment today.</p>
          <Link href="/contact" className="btn btn-green">Get a Quote →</Link>
        </div>
      </div>
    </>
  );
}
