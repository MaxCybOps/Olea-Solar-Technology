"use client";

import { useState } from "react";
import Image from "next/image";

const GALLERY_SETS: Record<string, string[]> = {
  inverters:          ["/images/services/ses.jpg",        "/images/gallery-1.jpg", "/images/gallery-3.jpg", "/images/gallery-5.jpg"],
  solar_panels:       ["/images/services/cei.jpg",        "/images/gallery-2.jpg", "/images/gallery-7.jpg", "/images/gallery-3.jpg"],
  batteries:          ["/images/services/ies.jpg",        "/images/gallery-5.jpg", "/images/gallery-1.jpg", "/images/gallery-2.jpg"],
  systems:            ["/images/services/consulting.jpg", "/images/gallery-3.jpg", "/images/gallery-5.jpg", "/images/gallery-7.jpg"],
  charge_controllers: ["/images/services/mnt.jpg",        "/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-3.jpg"],
  accessories:        ["/images/services/aca.jpg",        "/images/gallery-5.jpg", "/images/gallery-7.jpg", "/images/gallery-1.jpg"],
};

interface Props {
  category: string;
  productName: string;
  discount: number | null;
  isFeatured: boolean;
}

export default function ProductGallery({ category, productName, discount, isFeatured }: Props) {
  const images = GALLERY_SETS[category] ?? GALLERY_SETS.solar_panels;
  const [active, setActive] = useState(0);

  function share(platform: string) {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${productName} on Olea Technologies`);
    const map: Record<string, string> = {
      WhatsApp: `https://wa.me/?text=${text}%20${url}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      X: `https://x.com/intent/tweet?url=${url}&text=${text}`,
    };
    window.open(map[platform], "_blank", "noopener,noreferrer");
  }

  return (
    <div style={{ position: "sticky", top: 100 }}>
      {/* Main image */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "1/1", background: "var(--olea-green-50)" }}>
        <Image src={images[active]} alt={productName} fill style={{ objectFit: "cover" }} priority />
        {discount && (
          <span style={{ position: "absolute", top: 16, left: 16, background: "#e53e3e", color: "#fff", fontSize: 13, fontWeight: 700, padding: "5px 12px", borderRadius: 6, zIndex: 2 }}>
            -{discount}% OFF
          </span>
        )}
        {isFeatured && !discount && (
          <span style={{ position: "absolute", top: 16, left: 16, background: "var(--accent)", color: "var(--olea-ink)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 6, zIndex: 2 }}>
            Featured
          </span>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            style={{
              flex: 1, aspectRatio: "1/1", borderRadius: 10, overflow: "hidden",
              border: `2px solid ${i === active ? "var(--accent)" : "var(--border-subtle)"}`,
              position: "relative", cursor: "pointer",
              boxShadow: i === active ? "0 0 0 1px var(--accent)" : "none",
              padding: 0, background: "none",
              transition: "border-color 180ms, box-shadow 180ms",
              flexShrink: 0,
            }}
          >
            <Image
              src={src}
              alt={`${productName}, view ${i + 1}`}
              fill
              style={{ objectFit: "cover", opacity: i === active ? 1 : 0.6, transition: "opacity 180ms" }}
            />
          </button>
        ))}
      </div>

      {/* Share */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 13, color: "var(--fg-2)", flexWrap: "wrap" }}>
        <span style={{ fontWeight: 500 }}>Share:</span>
        {["WhatsApp", "Facebook", "X"].map((s) => (
          <button
            key={s}
            onClick={() => share(s)}
            style={{ padding: "5px 12px", borderRadius: 9999, border: "1px solid var(--border-subtle)", cursor: "pointer", fontSize: 12, background: "#fff", fontFamily: "var(--font-sans)", color: "var(--olea-ink)" }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
