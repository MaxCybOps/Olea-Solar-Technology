"use client";

import { useEffect, useState } from "react";
import ScrollFade from "./ScrollFade";

const ROADMAP = [
  { phase: "Now",      where: "Owerri, Imo",      note: "Headquarters & first installations", status: "live" },
  { phase: "Next",     where: "Across Nigeria",    note: "State by state, powering homes & industry", status: "planned" },
  { phase: "Then",     where: "West Africa",       note: "Taking clean energy regional", status: "future" },
  { phase: "The goal", where: "A powered Africa",  note: "And beyond, globally competitive", status: "future" },
];

function NigeriaMap() {
  const [loaded, setLoaded] = useState(false);
  const [paths, setPaths] = useState<{ d: string; name: string; live: boolean }[]>([]);
  const [hub, setHub] = useState<{ x: number; y: number } | null>(null);
  const [reach, setReach] = useState<{ x: number; y: number }[]>([]);
  const [vb, setVb] = useState("0 0 744 600");

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/@svg-maps/nigeria")
      .then(r => r.text())
      .then(txt => {
        const code = txt.replace(/export\s+default\s+/, "return ").replace(/export\s*\{[^}]*\}\s*;?/g, "");
        // eslint-disable-next-line no-new-func
        const m = new Function(code)();
        if (!m?.locations) return;
        setVb(m.viewBox || "0 0 744 600");
        const svgns = "http://www.w3.org/2000/svg";
        const msvg = document.createElementNS(svgns, "svg");
        msvg.setAttribute("viewBox", m.viewBox || "0 0 744 600");
        msvg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;left:-9999px";
        document.body.appendChild(msvg);
        const centroid = (d: string): [number, number] => {
          const p = document.createElementNS(svgns, "path");
          p.setAttribute("d", d); msvg.appendChild(p);
          let cx = 0, cy = 0;
          try {
            const len = p.getTotalLength(); const N = 80;
            for (let i = 0; i < N; i++) { const pt = p.getPointAtLength((i / N) * len); cx += pt.x; cy += pt.y; }
            cx /= N; cy /= N;
          } catch { const b = p.getBBox(); cx = b.x + b.width / 2; cy = b.y + b.height / 2; }
          msvg.removeChild(p);
          return [cx, cy];
        };
        const live = new Set(["imo"]);
        const stateList = m.locations.map((l: any) => ({ d: l.path, name: l.name, live: live.has(l.name.toLowerCase()) }));
        let hubPt: { x: number; y: number } | null = null;
        const reachPts: { x: number; y: number }[] = [];
        m.locations.forEach((l: any) => {
          const [x, y] = centroid(l.path);
          if (live.has(l.name.toLowerCase())) hubPt = { x, y };
          else reachPts.push({ x, y });
        });
        document.body.removeChild(msvg);
        setPaths(stateList);
        setHub(hubPt);
        setReach(reachPts);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, top: 52, bottom: 6, zIndex: 2 }}>
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
          Loading map…
        </div>
      )}
      {loaded && paths.length > 0 && (
        <svg viewBox={vb} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="oleaNodeGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g>
            {paths.map((s, i) => (
              <path key={i} d={s.d}
                fill={s.live ? "rgba(31,138,87,0.82)" : "rgba(31,138,87,0.28)"}
                stroke={s.live ? "rgba(249,166,6,0.95)" : "rgba(249,166,6,0.30)"}
                strokeWidth={s.live ? 1.4 : 0.7} strokeLinejoin="round" />
            ))}
          </g>
          {hub && reach.length > 0 && (
            <g>
              {reach.map((r, i) => (
                <line key={i} x1={(hub as any).x} y1={(hub as any).y} x2={r.x} y2={r.y}
                  stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.65"
                  strokeDasharray="5 5" strokeLinecap="round">
                  <animate attributeName="stroke-dashoffset" from="0" to="-40"
                    dur={`${1.6 + (i % 5) * 0.3}s`} repeatCount="indefinite" />
                </line>
              ))}
            </g>
          )}
          {hub && (
            <g filter="url(#oleaNodeGlow)">
              <circle cx={(hub as any).x} cy={(hub as any).y} r="5" fill="none" stroke="var(--accent)" strokeWidth="1.2">
                <animate attributeName="r" from="5" to="22" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.9" to="0" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx={(hub as any).x} cy={(hub as any).y} r="5.5" fill="#f9a606" />
            </g>
          )}
          {hub && (
            <foreignObject x={(hub as any).x + 9} y={(hub as any).y - 9} width="110" height="38">
              <div style={{ color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1.1, textShadow: "0 1px 6px rgba(0,0,0,0.95)" }}>
                Owerri
                <div style={{ fontSize: 8.5, fontWeight: 600, color: "var(--accent)", marginTop: 1 }}>Live · HQ</div>
              </div>
            </foreignObject>
          )}
        </svg>
      )}
    </div>
  );
}

export default function ImpactSection() {
  return (
    <section className="section section-white impact-section">
      <div className="container">

        {/* Header — full width above the two-column body */}
        <div className="impact-header">
          <span className="eyebrow">Our Mission</span>
          <h2 className="headline-section">We started in Owerri.<br />We're not stopping there.</h2>
          <p className="lead" style={{ maxWidth: 560 }}>
            Every install is a home, a business, a life powered. We measure success in diesel never
            burned and outages never suffered.
          </p>
        </div>

        {/* Body: roadmap left, map right — maintained at ALL screen sizes */}
        <div className="impact-body">

          {/* Roadmap column */}
          <div className="impact-roadmap">
            <p className="impact-roadmap__intro">
              Olea is just getting started, but the destination is clear. Here's the road from where
              we are to where we're going.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {ROADMAP.map((r, i) => {
                const isLive = r.status === "live";
                return (
                  <ScrollFade key={r.phase} delay={i * 90} from={i % 2 === 0 ? "left" : "right"}>
                    <div className="rm-row" style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 12 }}>
                      {/* dot + connector */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{
                          width: 13, height: 13, borderRadius: 9999, flexShrink: 0, marginTop: 3,
                          border: `2px solid ${isLive ? "var(--accent)" : "var(--olea-gray-400)"}`,
                          background: isLive ? "var(--accent)" : "#fff",
                          boxShadow: isLive ? "0 0 0 4px rgba(249,166,6,0.18)" : "none",
                          display: "block",
                        }} />
                        {i < ROADMAP.length - 1 && (
                          <span style={{ width: 2, flex: 1, background: "var(--border-subtle)", marginTop: 4, display: "block" }} />
                        )}
                      </div>
                      {/* text */}
                      <div className="rm-body" style={{ paddingBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 2 }}>
                          <span className="rm-phase" style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-2)" }}>
                            {r.phase}
                          </span>
                          {isLive && (
                            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--olea-ink)", background: "var(--accent)", padding: "2px 7px", borderRadius: 9999 }}>
                              Live
                            </span>
                          )}
                        </div>
                        <div className="rm-where" style={{ fontSize: 17, fontWeight: 600, color: "var(--olea-ink)", lineHeight: 1.25 }}>
                          {r.where}
                        </div>
                        <div className="rm-note" style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.45, marginTop: 2 }}>
                          {r.note}
                        </div>
                      </div>
                    </div>
                  </ScrollFade>
                );
              })}
            </div>
          </div>

          {/* Map card */}
          <ScrollFade delay={100} from="scale">
            <div className="impact-map-card">
              <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Where we are</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: 5 }}>
                  <span className="impact-live-dot" />
                  Live in Owerri
                </div>
              </div>
              <div style={{ color: "rgba(255,255,255,0.50)", fontSize: 11, position: "relative", zIndex: 2 }}>
                1 city today · expanding across Nigeria
              </div>
              <NigeriaMap />
              <div style={{ position: "absolute", left: 20, bottom: 18, zIndex: 3, display: "flex", gap: 14, fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 9999, background: "var(--accent)", display: "inline-block" }} />Live now
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: "rgba(31,138,87,0.45)", border: "1px solid rgba(249,166,6,0.4)", display: "inline-block" }} />Expansion
                </span>
              </div>
            </div>
          </ScrollFade>

        </div>
      </div>

      <style>{`
        @keyframes oleaLiveDot {
          0%   { box-shadow: 0 0 0 0 rgba(249,166,6,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(249,166,6,0); }
          100% { box-shadow: 0 0 0 0 rgba(249,166,6,0); }
        }
        .impact-live-dot {
          width: 6px; height: 6px; border-radius: 9999px;
          background: var(--accent); display: inline-block;
          animation: oleaLiveDot 2s infinite;
        }

        /* ── Desktop ── */
        .impact-header { max-width: 640px; margin-bottom: 52px; }
        .impact-body   { display: grid; grid-template-columns: 1fr 1.05fr; gap: 56px; align-items: start; }
        .impact-roadmap__intro { font-size: 16px; line-height: 1.65; color: var(--fg-2); margin: 0 0 28px; }

        .impact-map-card {
          background: var(--olea-green-900);
          border-radius: 18px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          aspect-ratio: 1 / 1;
        }

        /* ── Tablet 768–1023px: side-by-side, smaller gap ── */
        @media (max-width: 1023px) {
          .impact-header { margin-bottom: 36px; }
          .impact-body   { gap: 36px; }
          .impact-map-card { aspect-ratio: 4 / 3; }
        }

        /* ── Mobile 480–767px: keep side-by-side, shrink proportionally ── */
        @media (max-width: 767px) {
          .impact-header { margin-bottom: 20px; }
          .impact-body   { grid-template-columns: 1fr 1fr; gap: 14px; }

          /* Map card: taller aspect in narrow column */
          .impact-map-card { aspect-ratio: 3/4; max-height: none; border-radius: 12px; padding: 10px; }

          /* Roadmap: hide intro, shrink all text */
          .impact-roadmap__intro { display: none; }
          .rm-row   { grid-template-columns: 18px 1fr !important; gap: 7px !important; }
          .rm-body  { padding-bottom: 12px !important; }
          .rm-phase { font-size: 8px !important; }
          .rm-where { font-size: 11px !important; }
          .rm-note  { font-size: 9.5px !important; }
        }

        /* ── Small mobile <479px ── */
        @media (max-width: 479px) {
          .impact-map-card { aspect-ratio: 1/1; padding: 8px; }
          .impact-roadmap__intro { display: none; }
          .rm-where { font-size: 10px !important; }
          .rm-note  { font-size: 9px !important; }
          .impact-header { margin-bottom: 14px; }
        }
      `}</style>
    </section>
  );
}
