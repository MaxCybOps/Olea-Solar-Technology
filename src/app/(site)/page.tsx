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
import { Zap, Sun, MapPin, Award, Globe, Building2, Bot, ShieldCheck, Users, Cpu, HardHat, ClipboardCheck, Wrench, GraduationCap, type LucideIcon } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  cei: Zap, ses: Cpu, ies: HardHat, con: ClipboardCheck, mnt: Wrench, aca: GraduationCap,
};

export const metadata: Metadata = {
  title: "Olea Technologies | Powering Sustainable Future",
  description: "Africa's premium clean-energy company. Solar systems, smart infrastructure, and real support.",
};

const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  Zap, Sun, MapPin, Award, Globe, Building2, Bot, ShieldCheck, Users,
};

const SERVICE_IMAGES: Record<string, string> = {
  cei: "/images/services/cei.jpg", ses: "/images/services/ses.jpg",
  ies: "/images/services/ies.jpg", con: "/images/services/consulting.jpg",
  mnt: "/images/services/mnt.jpg", aca: "/images/services/aca.jpg",
};

const BLOG_POSTS = [
  { id: "b1", title: "What size solar system does your home actually need?", cat: "Energy Education",    date: "May 12, 2026", read: "6 min", image: "/images/blog/solar-sizing.jpg"   },
  { id: "b2", title: "Inside a 50KVA install at a Lagos factory",            cat: "Installation Stories", date: "Apr 28, 2026", read: "8 min", image: "/images/blog/factory-install.jpg" },
  { id: "b3", title: "Lithium vs. lead-acid: a 2026 buyer's guide",          cat: "Tech & Innovation",   date: "Apr 14, 2026", read: "5 min", image: "/images/blog/battery-guide.jpg"  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hp-hero">
        <div className="hp-hero__media">
          <video
            className="hp-hero__video"
            src="/videos/hero-fields.mp4"
            poster="/images/hero-poster.jpg"
            preload="none" autoPlay muted loop playsInline
          />
        </div>
        <div className="hp-hero__overlay" />
        <div className="hp-hero__overlay-bottom" />
        <div className="hp-hero__glow hp-hero__glow--gold" />
        <div className="hp-hero__glow hp-hero__glow--green" />
        <HeroParticles />

        <div className="container-wide hp-hero__content">
          <div className="hp-hero__inner">
            <span className="eyebrow">Powering Africa's Future</span>
            <h1 className="hp-hero__headline">
              Africa doesn't need to{" "}
              <span className="hp-hero__gold">beg</span>{" "}
              for power anymore.
            </h1>
            <p className="hp-hero__sub">
              Olea Technologies builds clean energy infrastructure that drives homes, businesses,
              and industries into the future, intelligently, sustainably, and at scale.
            </p>
            <div className="hp-hero__ctas">
              <Link href="/products" className="btn btn-primary">Explore Our Solutions →</Link>
              <Link href="/contact" className="btn btn-outline-light">Get a Free Assessment</Link>
            </div>
          </div>
        </div>

        <div className="hp-hero__scroll">
          <span>Scroll</span>
          <div className="hp-hero__scroll-line">
            <div className="hp-hero__scroll-dot" />
          </div>
        </div>
        <div className="hp-hero__ribbon" />
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[
            "Clean Energy Infrastructure", "Smart Energy Systems", "Industrial Solutions",
            "Energy Consulting", "Maintenance & Support", "Energy Academy",
            "500+ Installations", "25-Year Warranty", "2-Hour Response",
            "Clean Energy Infrastructure", "Smart Energy Systems", "Industrial Solutions",
            "Energy Consulting", "Maintenance & Support", "Energy Academy",
            "500+ Installations", "25-Year Warranty", "2-Hour Response",
          ].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-sep"> ✦ </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="hp-stats">
        <div className="container">
          <div className="hp-stats__grid">
            {STATS.map((s, i) => {
              const Icon = LUCIDE_ICONS[s.icon];
              return (
                <div key={s.label} className="hp-stats__item">
                  {i > 0 && <span className="hp-stats__divider" />}
                  <div className="hp-stats__icon">{Icon && <Icon size={22} />}</div>
                  <div className="hp-stats__value"><CountUp value={s.value} /></div>
                  <div className="hp-stats__label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── WHAT WE DO ── */}
      <section className="section section-white">
        <div className="container">
          <div className="hp-wwd__grid">
            <ScrollFade>
              <PurposeCarousel />
            </ScrollFade>
            <ScrollFade delay={120}>
              <div className="hp-wwd__text">
                <span className="eyebrow">Our Purpose</span>
                <h2 className="headline-section">
                  We don't just sell solar.<br />We engineer energy ecosystems.
                </h2>
                <p className="lead" style={{ marginBottom: 28 }}>
                  From a single home to an entire industrial complex, every solution we deploy is intelligent,
                  scalable, and engineered to perform for decades.
                </p>
                <div className="hp-wwd__pillars">
                  {[
                    { icon: <Zap size={20} />, title: "Clean Energy" },
                    { icon: <Cpu size={20} />, title: "Smart Systems" },
                    { icon: <ShieldCheck size={20} />, title: "Sustainability" },
                  ].map((p) => (
                    <div key={p.title} className="hp-wwd__pillar">
                      <div className="hp-wwd__pillar-icon">{p.icon}</div>
                      <div className="hp-wwd__pillar-title">{p.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section section-bg">
        <div className="container">
          <div className="hp-section-head">
            <span className="eyebrow">Services</span>
            <h2 className="headline-section">What we build for you.</h2>
            <p className="lead" style={{ margin: "0 auto" }}>Six divisions. One vision. A powered Africa.</p>
          </div>
          <div className="hp-svc__grid">
            {SERVICES.map((s, i) => {
              const SvcIcon = SERVICE_ICONS[s.id] ?? Zap;
              return (
                <ScrollFade key={s.id} delay={i * 70}>
                  <Link href={`/services#${s.id}`} className="card card-hoverable hp-svc__card">
                    <div className="hp-svc__img-wrap">
                      <Image src={SERVICE_IMAGES[s.id] ?? "/images/services/cei.jpg"} alt={s.name} fill
                        style={{ objectFit: "cover", transition: "transform 500ms var(--ease-out)" }}
                        className="hp-svc__img" />
                      <div className="hp-svc__img-scrim" />
                    </div>
                    <div className="hp-svc__body">
                      <div className="hp-svc__title-row">
                        <div className={`hp-svc__icon ${i % 3 === 1 ? "hp-svc__icon--gold" : ""}`}>
                          <SvcIcon size={22} />
                        </div>
                        <h4 className="hp-svc__name">{s.name}</h4>
                      </div>
                      <p className="hp-svc__blurb">{s.blurb}</p>
                      <span className="hp-svc__link">Learn More →</span>
                    </div>
                  </Link>
                </ScrollFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY OLEA ── */}
      <section className="section section-dark hp-why">
        <div className="hp-why__glow" />
        <div className="container">
          <div className="hp-why__head">
            <span className="eyebrow">Why Olea</span>
            <h2 className="hp-why__headline">
              Most companies sell you panels.<br />We sell you{" "}
              <span className="hp-why__gold">freedom.</span>
            </h2>
            <p className="hp-why__sub">
              Freedom from NEPA. Freedom from generator costs.<br />
              Freedom from uncertainty. Forever.
            </p>
          </div>
          <div className="hp-why__grid">
            {DIFFERENTIATORS.map((d, i) => {
              const Icon = LUCIDE_ICONS[d.icon];
              return (
                <ScrollFade key={d.title} delay={i * 80}>
                  <div className="hp-why__card card-hoverable">
                    <div className="hp-why__card-icon">{Icon && <Icon size={22} />}</div>
                    <h5 className="hp-why__card-title">{d.title}</h5>
                    <p className="hp-why__card-body">{d.body}</p>
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
          <div className="hp-section-head">
            <span className="eyebrow">What Our Clients Say</span>
            <h2 className="headline-section">Don't take our word for it.</h2>
            <p className="lead" style={{ margin: "0 auto" }}>Real clients. Real installations. Real freedom.</p>
          </div>
          <div className="hp-testi__grid">
            {TESTIMONIALS.map((t, i) => (
              <ScrollFade key={t.name} delay={i * 90}>
                <div className="card card-hoverable hp-testi__card">
                  <div className="hp-testi__stars">{"★".repeat(t.rating)}</div>
                  <p className="hp-testi__quote">"{t.quote}"</p>
                  <hr className="hp-testi__hr" />
                  <div className="hp-testi__who">
                    <div className="hp-testi__avatar">{t.initials}</div>
                    <div>
                      <div className="hp-testi__name">{t.name}</div>
                      <div className="hp-testi__role">{t.role} · {t.location}</div>
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
      <div className="hp-cta">
        <div className="hp-cta__glow" />
        <div className="container">
          <div className="hp-cta__inner">
            <div className="hp-cta__text">
              <div className="hp-cta__eyebrow">Ready when you are</div>
              <h2 className="hp-cta__headline">Your next power outage should be your last.</h2>
              <p className="hp-cta__sub">
                Talk to an energy expert today and take the first step toward permanent power independence.
              </p>
            </div>
            <Link href="/contact" className="btn btn-green hp-cta__btn">Talk to an Expert →</Link>
          </div>
        </div>
      </div>

      {/* ── BLOG PREVIEW ── */}
      <section className="section section-white">
        <div className="container">
          <div className="hp-blog__head">
            <div>
              <span className="eyebrow">Insights</span>
              <h2 className="headline-section" style={{ marginBottom: 8 }}>From the Olea blog.</h2>
              <p className="lead">Practical guides, install stories, and the science of clean energy.</p>
            </div>
            <Link href="/blog" className="btn btn-outline-dark hp-blog__all">Read All Articles →</Link>
          </div>
          <div className="hp-blog__grid">
            {BLOG_POSTS.map((b, i) => (
              <ScrollFade key={b.id} delay={i * 80}>
                <Link href={`/blog/${b.id}`} className="card card-hoverable hp-blog__card">
                  <div className="hp-blog__img-wrap">
                    <Image src={b.image} alt={b.title} fill
                      style={{ objectFit: "cover", transition: "transform 500ms var(--ease-out)" }}
                      className="hp-blog__img" />
                    <span className="hp-blog__cat">{b.cat}</span>
                  </div>
                  <div className="hp-blog__body">
                    <h4 className="hp-blog__title">{b.title}</h4>
                    <div className="hp-blog__meta">
                      <span>{b.date}</span><span>{b.read} read</span>
                    </div>
                  </div>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
