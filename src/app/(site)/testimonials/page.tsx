import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  { quote: "We installed a 3.5KVA system for our beauty salon in March. Our clients now enjoy uninterrupted service — no more generator fumes during treatments. Business is up 30% because we can finally serve clients in the evenings.", name: "Chinyere O.", role: "Spa & Beauty Owner", location: "Enugu", initials: "CO", rating: 5 },
  { quote: "As an engineer I reviewed every spec sheet before signing. Three months in, the system exceeds every performance metric. The battery management reporting is world-class. I'm recommending Olea to every colleague I know.", name: "Engr. Bello M.", role: "Mechanical Engineer", location: "Kano", initials: "BM", rating: 5 },
  { quote: "I'm 62 years old and I didn't think I could switch to solar. The Olea team was incredibly patient — they explained everything simply and came back twice to make sure I was comfortable. Now I sleep without generator noise.", name: "Mrs. Obioma C.", role: "Retired Civil Servant", location: "Onitsha", initials: "OC", rating: 5 },
  { quote: "Our congregation had been worshipping in heat for years. The 5KVA system now powers all our fans, projector, and sound system without interruption. The difference for our members has been remarkable.", name: "Pastor Emmanuel T.", role: "Church Administrator", location: "Abuja", initials: "ET", rating: 5 },
  { quote: "Perishable goods and unstable power don't mix. Olea built a dedicated system for our cold rooms. Not a single degree of temperature variance in six months. My losses dropped from 18% to under 1%.", name: "Adanna I.", role: "Cold-Chain Logistics Manager", location: "Onitsha", initials: "AI", rating: 5 },
  { quote: "Power cuts during dental procedures are unacceptable. Since installing the Olea 5KVA system we've had zero interruptions in 14 months. Patient confidence is up and so is revenue. Worth every naira.", name: "Dr. Yusuf K.", role: "Dental Surgeon", location: "Abuja", initials: "YK", rating: 5 },
  { quote: "Our refrigeration systems used to cost ₦80,000 a month in diesel. With the Olea industrial system that's down to under ₦8,000. The ROI was faster than they projected. I only regret not doing it sooner.", name: "Blessing A.", role: "Supermarket Manager", location: "Port Harcourt", initials: "BA", rating: 5 },
];

const ALL_TESTIMONIALS = [...TESTIMONIALS, ...EXTRA_TESTIMONIALS];

const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = { Zap, Sun, MapPin, Award, Globe };

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 160, paddingBottom: 80, overflow: "hidden", minHeight: 500 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/impact-community.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.90) 0%, rgba(7,41,31,0.70) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
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
          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {ALL_TESTIMONIALS.map((t, i) => (
              <ScrollFade key={t.name + i} delay={i * 60}>
                <div className="card card-hoverable" style={{ padding: 32, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ color: "var(--accent)", fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>{"★".repeat(t.rating)}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--olea-ink)", margin: "0 0 20px", fontStyle: "italic", flex: 1 }}>"{t.quote}"</p>
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

      <style>{`
        @media (max-width: 960px) { .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .reviews-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
