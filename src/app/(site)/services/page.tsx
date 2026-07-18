import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollFade from "@/components/site/ScrollFade";
import { Zap, Cpu, HardHat, ClipboardCheck, Wrench, GraduationCap, Check, type LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Olea Technologies",
  description: "Six divisions. One vision. Clean energy infrastructure, smart systems, industrial solutions, consulting, maintenance, and academy.",
};

const SERVICES_FULL: {
  id: string;
  Icon: LucideIcon;
  eyebrow: string;
  headline: string;
  body: string;
  bullets: string[];
  image: string;
}[] = [
  {
    id: "cei",
    Icon: Zap,
    eyebrow: "Clean Energy Infrastructure",
    headline: "Power that never quits, engineered from the ground up.",
    body: "We design and deploy complete solar energy systems for residential, commercial, and industrial clients. Every installation is engineered to perform — not just today, but for the next 25 years.",
    bullets: [
      "Complete solar design & installation",
      "Residential, commercial & industrial",
      "25-year performance warranty panels",
      "Hybrid & off-grid system options",
    ],
    image: "/images/services/cei.jpg",
  },
  {
    id: "ses",
    Icon: Cpu,
    eyebrow: "Smart Energy Systems",
    headline: "Energy you can see, control, and trust.",
    body: "We integrate intelligent energy management systems that monitor, optimize, and automate your power consumption in real time. Your building, thinking for itself.",
    bullets: [
      "Real-time monitoring dashboard",
      "Automated load management",
      "Remote diagnostics & alerts",
      "App-based system control",
    ],
    image: "/images/services/ses.jpg",
  },
  {
    id: "ies",
    Icon: HardHat,
    eyebrow: "Industrial Energy Solutions",
    headline: "High-capacity power for those who can't afford downtime.",
    body: "For factories, warehouses, and large facilities — we deliver high-capacity power infrastructure that eliminates operational disruption and slashes fuel costs.",
    bullets: [
      "Three-phase hybrid systems",
      "Factory & warehouse solutions",
      "50KVA+ installations",
      "24/7 operational reliability",
    ],
    image: "/images/services/ies.jpg",
  },
  {
    id: "con",
    Icon: ClipboardCheck,
    eyebrow: "Energy Consulting",
    headline: "We measure twice. Then we build.",
    body: "Our expert consultants assess your energy profile, identify inefficiencies, and design a solution that fits your goals and your budget — before you commit a single naira.",
    bullets: [
      "Full energy audits & load profiling",
      "System sizing & specification",
      "ROI & payback modelling",
      "Vendor-neutral recommendations",
    ],
    image: "/images/services/consulting.jpg",
  },
  {
    id: "mnt",
    Icon: Wrench,
    eyebrow: "Maintenance & Support",
    headline: "We don't disappear after installation.",
    body: "Your system is monitored, serviced, and supported long after handover. Our technical team is always one call away — and our monitoring platform catches issues before you do.",
    bullets: [
      "Scheduled preventive maintenance",
      "Emergency callout service",
      "Remote system monitoring",
      "Annual service contracts",
    ],
    image: "/images/services/mnt.jpg",
  },
  {
    id: "aca",
    Icon: GraduationCap,
    eyebrow: "Energy Academy",
    headline: "Building the people who'll power Africa.",
    body: "We train technicians, engineers, and young Africans to build, operate, and maintain the energy infrastructure of tomorrow. Powering people, not just buildings.",
    bullets: [
      "Technician & engineer certification",
      "Youth solar programmes",
      "Hands-on installation training",
      "Career placement & support",
    ],
    image: "/images/services/aca.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--olea-green-900)", color: "#fff", paddingTop: 160, paddingBottom: 100, overflow: "hidden", minHeight: 520 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/services-hero.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,41,31,0.90) 0%, rgba(7,41,31,0.68) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <nav style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.48)" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span>Services</span>
          </nav>
          <span className="eyebrow">What We Do</span>
          <h1 className="t-display" style={{ color: "#fff", margin: "0 0 24px", maxWidth: 820, lineHeight: 1.06 }}>
            Six divisions.<br />
            <span style={{ color: "var(--accent)" }}>One powered Africa.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", maxWidth: 680, lineHeight: 1.7, margin: 0 }}>
            Everything we build is designed for scale, reliability, and decades of performance.
          </p>
        </div>
      </section>

      {/* ── SERVICE SECTIONS (alternating image/text) ── */}
      {SERVICES_FULL.map((svc, i) => {
        const imgLeft = i % 2 === 1;
        const IconCmp = svc.Icon;
        return (
          <section key={svc.id} id={svc.id} className={`section ${i % 2 === 0 ? "section-white" : "section-bg"}`}>
            <div className="container">
              <div className={`svc-row${imgLeft ? " svc-row--img-left" : ""}`}>
                {/* Text — always first in DOM; CSS handles visual swap */}
                <ScrollFade from={imgLeft ? "right" : "left"} className="svc-text-cell">
                  <div>
                    <div style={{
                      width: 48, height: 48, borderRadius: 10,
                      background: "var(--olea-green-50)", color: "var(--olea-green-700)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 20,
                    }}>
                      <IconCmp size={22} />
                    </div>
                    <span className="eyebrow">{svc.eyebrow}</span>
                    <h2 className="headline-section" style={{ margin: "4px 0 18px" }}>{svc.headline}</h2>
                    <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--fg-2)", margin: "0 0 24px" }}>{svc.body}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 11 }}>
                      {svc.bullets.map((b) => (
                        <li key={b} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 15, color: "var(--olea-ink)", fontWeight: 500 }}>
                          <span style={{
                            width: 24, height: 24, borderRadius: 9999,
                            background: "var(--olea-green-50)", color: "var(--olea-green-700)",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                          }}>
                            <Check size={13} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      style={{
                        display: "inline-flex", alignItems: "center",
                        background: "var(--olea-green-900)", color: "#fff",
                        borderRadius: 9999, padding: "13px 26px",
                        fontSize: 14.5, fontWeight: 700, fontFamily: "var(--font-sans)",
                        textDecoration: "none",
                      }}
                    >
                      Discuss This Service →
                    </Link>
                  </div>
                </ScrollFade>

                {/* Image */}
                <ScrollFade from={imgLeft ? "left" : "right"} delay={80} className="svc-img-cell">
                  <div className="svc-img-wrap">
                    <Image src={svc.image} alt={svc.eyebrow} fill style={{ objectFit: "cover" }} />
                  </div>
                </ScrollFade>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── GOLD CTA ── */}
      <section style={{ background: "var(--accent)", padding: "80px 0" }}>
        <div className="container">
          <div className="svc-cta-grid">
            <ScrollFade>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--olea-green-900)", opacity: 0.65, display: "block", marginBottom: 12 }}>
                  Not Sure Where to Start
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 44px)", color: "var(--olea-green-900)", margin: "0 0 10px", lineHeight: 1.1 }}>
                  Not sure which<br />solution fits?
                </h2>
                <p style={{ fontSize: 15, color: "var(--olea-green-900)", opacity: 0.70, margin: 0 }}>
                  Book a free consultation — we&apos;ll assess your needs and design the right solution for your home, business, or facility.
                </p>
              </div>
            </ScrollFade>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center",
                  background: "var(--olea-green-900)", color: "#fff",
                  borderRadius: 9999, padding: "14px 28px",
                  fontSize: 14.5, fontWeight: 700, fontFamily: "var(--font-sans)", textDecoration: "none",
                }}
              >
                Talk to an Expert →
              </Link>
              <Link
                href="/faqs"
                style={{
                  display: "inline-flex", alignItems: "center",
                  background: "transparent", color: "var(--olea-green-900)",
                  border: "2px solid var(--olea-green-900)",
                  borderRadius: 9999, padding: "13px 28px",
                  fontSize: 14.5, fontWeight: 700, fontFamily: "var(--font-sans)", textDecoration: "none",
                }}
              >
                Read Our FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .svc-row {
          display: flex;
          gap: 64px;
          align-items: center;
        }
        .svc-row--img-left {
          flex-direction: row-reverse;
        }
        .svc-text-cell { flex: 1; min-width: 0; }
        .svc-img-cell  { flex: 0 0 46%; }
        .svc-img-wrap  {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 480px;
        }
        .svc-cta-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 1023px) {
          .svc-row    { gap: 48px; }
          .svc-img-cell { flex: 0 0 44%; }
          .svc-img-wrap { height: 380px; }
          .svc-cta-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 767px) {
          .svc-row,
          .svc-row--img-left { flex-direction: column; gap: 32px; }
          .svc-text-cell,
          .svc-img-cell  { flex: none; width: 100%; }
          .svc-img-wrap  { height: 240px; border-radius: 14px; }
        }
      `}</style>
    </>
  );
}
