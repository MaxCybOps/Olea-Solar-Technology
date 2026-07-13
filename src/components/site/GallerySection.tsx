"use client";

import { useRef, useState, useEffect } from "react";

const GALLERY_ITEMS = [
  { img: "/images/gallery-1.jpg",   tag: "Utility Scale",    title: "A full ground-mount array, commissioned by our team",  cols: 2, rows: 2 },
  { video: "/videos/gallery-hero.mp4", poster: "/images/gallery-poster.webp", tag: "On Site", title: "Clean power, generating in real time", cols: 1, rows: 1 },
  { img: "/images/gallery-2.jpg",   tag: "Energy Access",    title: "Power reaching homes, one roof at a time",              cols: 1, rows: 1 },
  { img: "/images/gallery-3.jpg",   tag: "Installation",     title: "Rooftop systems, panel by panel",                       cols: 1, rows: 1 },
  { img: "/images/gallery-4.jpg",   tag: "Our People",       title: "On the roof at golden hour",                           cols: 1, rows: 1 },
  { img: "/images/gallery-5.jpg",   tag: "Clean Energy",     title: "Solar and wind, working the same land",                cols: 2, rows: 1 },
  { img: "/images/gallery-6.jpg",   tag: "Smart Monitoring", title: "Live performance, watched around the clock",           cols: 1, rows: 1 },
  { img: "/images/gallery-7.jpg",   tag: "Impact",           title: "Communities powered, futures switched on",             cols: 1, rows: 1 },
];

interface TileProps {
  item: typeof GALLERY_ITEMS[0];
}

function TiltTile({ item }: TileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [vidIn, setVidIn] = useState(false);

  useEffect(() => {
    if (!item.video) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (es) => { if (es[0]?.isIntersecting) { setVidIn(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [item.video]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(12px)`;
    el.style.boxShadow = "0 24px 60px rgba(7,41,31,0.5), 0 0 0 1px rgba(249,166,6,0.5)";
    const m = el.querySelector(".tile-media") as HTMLElement; if (m) m.style.transform = "scale(1.08)";
    const s = el.querySelector(".tile-scrim") as HTMLElement; if (s) s.style.opacity = "1";
  }

  function onLeave() {
    const el = ref.current; if (!el) return;
    el.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
    el.style.boxShadow = "var(--shadow-md)";
    const m = el.querySelector(".tile-media") as HTMLElement; if (m) m.style.transform = "scale(1)";
    const s = el.querySelector(".tile-scrim") as HTMLElement; if (s) s.style.opacity = "0.85";
  }

  return (
    <div
      ref={ref}
      style={{
        position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer",
        transformStyle: "preserve-3d", transition: "transform 300ms var(--ease-out), box-shadow 300ms var(--ease-out)",
        boxShadow: "var(--shadow-md)", background: "var(--olea-green-900)",
        gridColumn: `span ${item.cols}`, gridRow: `span ${item.rows}`,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {item.video ? (
        <video
          className="tile-media"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms var(--ease-out)" }}
          src={vidIn ? item.video : undefined}
          poster={item.poster}
          preload="none" autoPlay muted loop playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="tile-media"
          src={item.img}
          alt={item.title}
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms var(--ease-out)" }}
        />
      )}

      <div
        className="tile-scrim"
        style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,41,31,0) 45%, rgba(7,41,31,0.88) 100%)", opacity: 0.85, transition: "opacity 300ms" }}
      />

      {item.video && (
        <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2, display: "flex", alignItems: "center", gap: 5, background: "rgba(7,41,31,0.7)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", padding: "4px 9px", borderRadius: 9999, textTransform: "uppercase" }}>
          <span style={{ width: 6, height: 6, borderRadius: 9999, background: "var(--accent)", display: "inline-block" }} />Live
        </div>
      )}

      <div style={{ position: "absolute", left: 18, right: 18, bottom: 16, zIndex: 2, transform: "translateZ(40px)" }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>{item.tag}</div>
        <div style={{ color: "#fff", fontSize: 15, fontWeight: 600, lineHeight: 1.25, textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>{item.title}</div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section className="section section-dark hp-gallery" style={{ position: "relative" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
          <span className="eyebrow">Our Work</span>
          <h2 className="headline-section" style={{ color: "#fff" }}>From the field, not a brochure.</h2>
          <p className="lead">Real installations. Real engineers. Real African sites, powered by Olea.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "190px", gap: 16, gridAutoFlow: "dense", perspective: "1400px" }} className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <TiltTile key={i} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 160px !important; } }
        @media (max-width: 540px) { .gallery-grid { grid-template-columns: 1fr !important; grid-auto-rows: 200px !important; } .gallery-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; } }
      `}</style>
    </section>
  );
}
