"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Already seen this browser session — skip on internal remounts (e.g. fast refresh in dev)
    if (typeof window !== "undefined" && sessionStorage.getItem("olea_splash_seen")) {
      setVisible(false);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const holdMs = reduce ? 150 : 1250;
    const fadeMs = reduce ? 0 : 550;

    const t1 = setTimeout(() => setFading(true), holdMs);
    const t2 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("olea_splash_seen", "1");
    }, holdMs + fadeMs);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "var(--olea-green-900)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 550ms ease",
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Energy pulse rings */}
        <span className="splash-ring splash-ring--1" />
        <span className="splash-ring splash-ring--2" />
        <span className="splash-ring splash-ring--3" />

        {/* Logo */}
        <div className="splash-logo">
          <Image src="/images/logo-white.png" alt="Olea Technologies" width={200} height={56} style={{ height: 52, width: "auto" }} priority />
        </div>

        {/* Charging bar */}
        <div className="splash-bar-track">
          <div className="splash-bar-fill" />
        </div>

        <div className="splash-tagline">Powering Africa&apos;s Future</div>
      </div>

      <style>{`
        .splash-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 90px;
          height: 90px;
          margin: -45px 0 0 -45px;
          border-radius: 9999px;
          border: 1.5px solid var(--accent);
          opacity: 0;
          animation: splashPulse 2.2s ease-out infinite;
        }
        .splash-ring--2 { animation-delay: 0.5s; }
        .splash-ring--3 { animation-delay: 1s; }

        @keyframes splashPulse {
          0%   { transform: scale(0.6); opacity: 0.55; }
          100% { transform: scale(3.2); opacity: 0; }
        }

        .splash-logo {
          opacity: 0;
          transform: scale(0.88);
          animation: splashLogoIn 700ms cubic-bezier(0.22,1,0.36,1) 120ms forwards;
          position: relative;
          z-index: 1;
        }
        @keyframes splashLogoIn {
          to { opacity: 1; transform: scale(1); }
        }

        .splash-bar-track {
          margin-top: 26px;
          width: 150px;
          height: 3px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.14);
          overflow: hidden;
          opacity: 0;
          animation: splashFadeIn 400ms ease 500ms forwards;
        }
        .splash-bar-fill {
          height: 100%;
          width: 0%;
          border-radius: 9999px;
          background: linear-gradient(90deg, var(--accent), var(--accent-hover));
          box-shadow: 0 0 10px rgba(249,166,6,0.6);
          animation: splashCharge 1000ms cubic-bezier(0.4,0,0.2,1) 550ms forwards;
        }
        @keyframes splashCharge {
          to { width: 100%; }
        }

        .splash-tagline {
          margin-top: 16px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          opacity: 0;
          animation: splashFadeIn 500ms ease 700ms forwards;
        }
        @keyframes splashFadeIn {
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-ring { display: none; }
          .splash-logo, .splash-bar-track, .splash-tagline { animation: none !important; opacity: 1 !important; transform: none !important; }
          .splash-bar-fill { animation: none !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
