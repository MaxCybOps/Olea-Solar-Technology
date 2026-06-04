"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  "/images/purpose-1.jpg",
  "/images/purpose-2.jpg",
  "/images/purpose-3.jpg",
  "/images/purpose-4.jpg",
  "/images/purpose-5.jpg",
];

export default function PurposeCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      aspectRatio: "4/5",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "var(--shadow-xl)",
      position: "relative",
      background: "var(--olea-green-900)",
      maxWidth: 440,
      width: "100%",
    }}>
      {SLIDES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt="Olea at work"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? "scale(1.1)" : "scale(1.02)",
            transition: "opacity 1200ms cubic-bezier(0.22,1,0.36,1), transform 6000ms ease-out",
          }}
        />
      ))}

      {/* bottom gradient overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(180deg, transparent 40%, rgba(7,41,31,0.55) 100%)" }} />

      {/* dot indicators */}
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, zIndex: 3, display: "flex", gap: 7, justifyContent: "center" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === idx ? 22 : 7,
              height: 7,
              borderRadius: 9999,
              background: i === idx ? "var(--accent)" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 300ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
